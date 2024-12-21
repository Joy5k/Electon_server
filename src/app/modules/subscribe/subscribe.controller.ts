import { userController } from './../users/user.controller';
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { subscribeServices } from "./subscribe.services";
import { Request, Response } from "express";
import CustomError from "../../error/customError";
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';

const createUserSubscription =catchAsync(async(req,res)=>{
    const payload=req.body;
    const result =await subscribeServices.createSubscriber(payload);
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Subscribed successfully",
        data:result
    })
})

const handleSubscriberStatus=catchAsync(async(req:Request,res:Response)=>{
    const token=req.headers.authorization
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Token is not available .check the headers")

    }
    const {email}= jwtHelpers.verifyToken(token,config.jwt.jwt_access_secret as string)
    const result=await subscribeServices.handleSubscriber(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Update subscribe status",
        data:result
    })
})

export const subscribeController={
    createUserSubscription,
    handleSubscriberStatus
}