import { USER_STATUS } from './../../../shared/type';

import * as bcrypt from "bcrypt";

import { Secret } from "jsonwebtoken";
import mongoose from 'mongoose';
import ApiError from "../../error/customError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Users } from "../users/user.model";
import CustomError from "../../error/customError";
import { sendEmail } from '../../utils/emailSender';
import { TRegister } from './auth.interface';

const loginUser = async (payload: { email: string; password: string }) => {
  const userData=await Users.findOne({email:payload.email})

if(!userData){
   throw new CustomError(httpStatus.NOT_FOUND,"User is not available")
}
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
   throw new ApiError(401,"Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData?.id,
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId:userData.id
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const registerUser=async(payload:TRegister)=>{
  const userData=await Users.findOne({email:payload.email})
if(userData){
  throw new CustomError(httpStatus.BAD_REQUEST,`User already created by ${payload.email}` )
}
  const session = await mongoose.startSession();

  session.startTransaction(); 
  try {

const createUser=await Users.create(payload)
if(!createUser){
  throw new CustomError(httpStatus.BAD_REQUEST,"Failed the create User")
}
const accessToken = jwtHelpers.generateToken(
  {
    email: createUser.email,
    role: createUser.role,
    userId: createUser?.id,
  },
  config.jwt.jwt_access_secret as Secret,
  config.jwt.expires_in as string
);

const refreshToken = jwtHelpers.generateToken(
  {
    email: createUser.email,
    role: createUser.role,
    userId:createUser.id
  },
  config.jwt.refresh_token_secret as Secret,
  config.jwt.refresh_token_expires_in as string


);
await session.commitTransaction();
await session.endSession();

return {data:createUser,accessToken,refreshToken}
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
 
}

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await Users.findOne({
    email:decodedData.email,
    status:USER_STATUS.ACTIVE
  })
if(!userData){
  throw new CustomError(httpStatus.NOT_FOUND,'User is not Available')
}
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId:userData.id
    },
    config.jwt.jwt_access_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await Users.findOne({
    where: {
      email: user.email,
      status: USER_STATUS.ACTIVE,
    },
  });
  if(!userData){
    throw new CustomError(httpStatus.NOT_FOUND,"user not found")
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );
  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await Users.findByIdAndUpdate({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await Users.findOne({
      email: payload.email,
      status: USER_STATUS.ACTIVE,
  });

  if(!userData){
    throw new CustomError(httpStatus.NOT_FOUND,"user Not found")
  }
  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_pass_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  );
  const resetPassLink =
  config.jwt.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;
  
  await sendEmail(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
  );
};


const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {

const userData=await Users.findOne({
  _id:payload.id,
  status:USER_STATUS.ACTIVE
})
if(!userData){
throw new CustomError(httpStatus.NOT_FOUND,"User is not valid")
}
  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret as Secret
  );

  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await Users.findByIdAndUpdate({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};

export const AuthServices = {
  loginUser,
  registerUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};