import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { subscribeServices } from "./subscribe.services";

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

export const subscribeController={
    createUserSubscription
}