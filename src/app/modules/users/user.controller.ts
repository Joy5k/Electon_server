import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.services";
import { AuthServices } from "../auth/auth.services";
import { Request, Response } from "express";
import { tokenDecoded } from "../../../shared/userAuth";
import CustomError from "../../error/customError";
import { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";

const createAdmin=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization
    const id=req.body
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorized access")
    }
    const decoded=jwtHelpers.verifyToken(token,config.jwt.jwt_access_secret as string) as {email:string,role:string}
    if(decoded.role!=="super_admin"){
        throw new CustomError(httpStatus.NOT_ACCEPTABLE,"Not acceptable your request. Must be super_admin")
    }
    const result=await userServices.createAdminIntoDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Admin created Successfully",
        data:result
    })
})

const getAllUsers=catchAsync(async(req:Request,res:Response)=>{
    const result=await userServices.getAllUsersFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Users Retrieved successfully",
        data:result,
        meta:{
            page:Number(req.query.page)||0,
            limit:Number(req.query.limit)|| 10,
            total:result.length
        }
    })
})

const changeRoleUserToSeller=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const {userId}= tokenDecoded(token) as {userId:string}
    const result=await userServices.changeRoleUserToSellerIntoDB(userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Role Changed successfully",
        data:result
    })
})
const updateMe=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const payload=req.body;
    const {userId}= tokenDecoded(token) as {userId:string}
    const result=await userServices.updateMeFromDB(payload,userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Users update successfully",
        data:result
    })
})

const getMe=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const {userId}= tokenDecoded(token) as {userId:string}
    const result=await userServices.getMeFromDB(userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"My Profile Retrieved successfully",
        data:result
    })
})

const blockUser=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const result=await userServices.blockUserIntoDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"user status has been changed",
        data:result
    })
})

const deleteUser=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const result=await userServices.deleteUserFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"user deleted for permanently",
        data:result
    })
})

export const userController={
    getAllUsers,
    getMe,
    updateMe,
    deleteUser,
    blockUser,
    createAdmin,
    changeRoleUserToSeller
}