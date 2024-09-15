import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { bookingServices } from "./booking.services";


const getAllMybookingList=catchAsync(async(req,res)=>{
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
    const result=await bookingServices.postBookingIntoDB(payload)
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
    getAllMybookingList,
    postBooking    ,
    deleteBooking
}