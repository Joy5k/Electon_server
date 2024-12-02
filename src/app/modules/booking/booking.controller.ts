import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { bookingServices } from "./booking.services";
import { tokenDecoded } from "../../../shared/userAuth";
import { JwtPayload } from "jsonwebtoken";
import CustomError from "../../error/customError";


const getAllMyBookingList=catchAsync(async(req,res)=>{
    const result=await bookingServices.getAllMyBookingListFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Booking retrieved successfully",
        data:result
    })
})
const postBooking=catchAsync(async(req,res)=>{
    const payload=req.body;
    const token=req.headers.authorization
    console.log(payload)
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"You are not authorized")
    }
    const decoded=tokenDecoded(token)as JwtPayload
  
    const result=await bookingServices.postBookingIntoDB(payload,decoded.userId)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"booking created successfully",
        data:result
    })
})

const deleteBooking=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await bookingServices.deleteBookingFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Deleted the Product From the booking List successfully",
        data:result
    })
})


export const bookingController={
    getAllMybookingList: getAllMyBookingList,
    postBooking    ,
    deleteBooking
}