import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"

const getAllMyBookingListFromDB=async()=>{
    const result=await Booking.find().populate(["userId","productId"])
    return result
}
const postBookingIntoDB=async(productId:TBooking,userId:string)=>{
    console.log(productId,userId)
    const result=await Booking.create({productId,userId})
    return result
}

const deleteBookingFromDB=async(id:string)=>{
    const result=await Booking.findByIdAndDelete(id)
    return result
}


export const bookingServices={
    getAllMyBookingListFromDB,
    postBookingIntoDB,
    deleteBookingFromDB
}