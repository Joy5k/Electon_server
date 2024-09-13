import { Booking } from "./booking.model"

const getAllMyBookingListFromDB=async()=>{
    const result=await Booking.find()
    return result
}

export const bookingServices={
    getAllMyBookingListFromDB
}