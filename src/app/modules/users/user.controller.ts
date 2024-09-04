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

export const userController={
    getAllUsers
}