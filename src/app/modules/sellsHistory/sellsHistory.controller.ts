import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { sellsHistoryServices } from "./sellsHistory.services";
import sendResponse from "../../../shared/sendResponse";


const createSellHistory=catchAsync(async(req,res)=>{
    const payload=req.body;
    const result =await sellsHistoryServices.createSellHistoryIntoDB(payload)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Sells history created successfully!",
        data: result
    })
})  



const getAllSoldHistory=catchAsync(async(req,res)=>{+
    const result=await sellsHistoryServices.getAllSoldHistory()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Sells history retrieved successfully!",
        data: result
    })
})

export const sellsHistoryController={

    createSellHistory,
}