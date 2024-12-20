import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { subscribeServices } from "./subscribe.services";

const createUserSubscription =catchAsync(async(req,res)=>{
    const {email}=req.body;
    console.log(email)
    const result =await subscribeServices.createSubscriber(email);
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Subscribed successfully",
        data:result
    })
})

export const subscribeController={
    createUserSubscription
}