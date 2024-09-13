import catchAsync from "../../../shared/catchAsync";
import { bookingServices } from "./booking.services";


const getAllMybookingList=catchAsync(async(req,res)=>{
    const result=await bookingServices.getAllMyBookingListFromDB()
})

export const bookingController={
    getAllMybookingList
}