import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.services";
import CustomError from "../../error/customError";
import { tokenDecoded } from "../../../shared/userAuth";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: true, 
        httpOnly: true, 
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});
const registerUser=catchAsync(async(req:Request,res:Response)=>{
    const payload=req.body;
    const result=await AuthServices.registerUser(payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Registered successfully!",
        data: result
     
    })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token generated successfully!",
        data: result
     
    })
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    // const user = req.user;
    const user = req;
    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed successfully",
        data: result
    })
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {

    await AuthServices.forgotPassword(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Check your email!",
        data: null
    })
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {

    const token = req.headers.authorization || "";

    await AuthServices.resetPassword(token, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Reset!",
        data: null
    })
});

// Two factor authentication controller codes below

const setup2FA=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const {userId}= tokenDecoded(token) as {userId:string}
    const result=await  AuthServices.setup2FA(userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Scan this QR code with your authenticator app",
        data: result
    })
})
// verify 2fa token
const verify2FA=catchAsync(async(req:Request,res:Response)=>{
    const authToken=req.headers.authorization;
    if(!authToken){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const {userId}= tokenDecoded(authToken) as {userId:string}
    const {token}=req.body;

    const result=await AuthServices.verify2FA(userId,token)
 
    res.json({
        data:result
    })
})
export const AuthController = {
    loginUser,
    registerUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
    setup2FA,
    verify2FA
};