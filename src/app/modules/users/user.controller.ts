import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.services";


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
    const user=req.user
})
export const userController={
    getAllUsers
}