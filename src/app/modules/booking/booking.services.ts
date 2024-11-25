import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"

const getAllMyBookingListFromDB=async()=>{
    const result=await Booking.find().populate(["userId","productId"])
    return result
}
const postBookingIntoDB=async(productId:TBooking,userId:string)=>{
    const isExistProduct=await Booking.findOne({productId})
  
    if (isExistProduct) {
        // If the booking exists, increment the quantity by 1
        return await Booking.findOneAndUpdate(
            { productId, userId },
            { $inc: { userSelectedQuantity: 1 } }, // Increment quantity
            { new: true } 
        );
    } else {
        // If the booking doesn't exist, create a new booking
        const result = await Booking.create({ productId, userId, quantity: 1 });
        return result;
    }
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