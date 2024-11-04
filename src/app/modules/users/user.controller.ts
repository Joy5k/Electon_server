import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.services";
import { AuthServices } from "../auth/auth.services";
import { Request, Response } from "express";
import { tokenDecoded } from "../../../shared/userAuth";
import CustomError from "../../error/customError";
import { JwtPayload } from "jsonwebtoken";

const createAdmin=catchAsync(async(req,res)=>{
    const role=req.body;
    const result=await userServices.createAdminIntoDB(role)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Admin created Successfully",
        data:result
    })
})
const getAllUsers=catchAsync(async(req,res)=>{
    const result=await userServices.getAllUsersFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Users Retrieved successfully",
        data:result
    })
})
const updateMe=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Unauthorize access")
    }
    const payload=req.body;
    const id= tokenDecoded(token) as string
    const result=await userServices.updateMeFromDB(payload,id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Users update successfully",
        data:result
    })
})
const getMe=catchAsync(async(req,res)=>{
    const email=req.body
    const result=await userServices.getMeFromDB(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"My Profile Retrieved successfully",
        data:result
    })
})

const blockUser=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const userStatus=req.body
    const result=await userServices.blockUserIntoDB(userStatus,id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"user status has been changed",
        data:result
    })
})

const deleteUser=catchAsync(async(req,res)=>{
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
    deleteUser,
    blockUser,
    createAdmin
}