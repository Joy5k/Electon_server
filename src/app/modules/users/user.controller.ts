import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.services";

const registerUserIntoDB=catchAsync(async(req,res)=>{
    const payload=req.body;
    const result = await userServices.registerUser(payload)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"user Registered Successfully",
        data:result
    
    })
})
const loginUserIntoDB=catchAsync(async(req,res)=>{
    const payload=req.body
    const result=await userServices.loginUser(payload)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"user login successfully",
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
    registerUserIntoDB,
    loginUserIntoDB,
    deleteUser
}