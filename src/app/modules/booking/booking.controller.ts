import catchAsync from "../../../shared/catchAsync";
import { bookingServices } from "./booking.services";


const getAllMybookingList=catchAsync(async(req,res)=>{
    const result=await bookingServices.getAllMyBookingListFromDB()
})
const postBooking=catchAsync(async(req,res)=>{
    const payload=req.body;
    
})
export const bookingController={
    getAllMybookingList
}