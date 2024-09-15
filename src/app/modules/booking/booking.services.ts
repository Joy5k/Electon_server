import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"

const getAllMyBookingListFromDB=async()=>{
    const result=await Booking.find()
    return result
}
const postBookingIntoDB=async(payload:TBooking)=>{
    const result=await Booking.create(payload)
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