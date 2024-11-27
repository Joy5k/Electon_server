import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { tokenDecoded } from "../../../shared/userAuth";
import { JwtPayload } from "jsonwebtoken";
import CustomError from "../../error/customError";


const createPayment=catchAsync(async(req,res)=>{
    const payload=req.body;
    const token=req.headers.authorization
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"You are not authorized")
    }
    const decoded=tokenDecoded(token)as JwtPayload
  
    const result=await (payload.productId,decoded.userId)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"booking created successfully",
        data:result
    })
})




export const paymentController={
   
    createPayment,
   
}