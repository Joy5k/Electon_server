import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model"

const getAllMyBookingListFromDB = async () => {
    const result = await Booking.find()
      .populate("userId", "-password -secret")  // Exclude password and secret in populated userId
      .populate("productId")  // You can keep productId without exclusion if you don't need to exclude any field
      .select("-password -secret");  // Exclude password and secret from the booking data itself
    return result;
  };
  
const postBookingIntoDB=async(payload:any,userId:string)=>{
    const {productId,userSelectedQuantity}=payload
    const isExistProduct=await Booking.findOne({productId})


    if (isExistProduct) {
        // If the booking exists, increment the quantity by 1
        return await Booking.findOneAndUpdate(
            { productId, userId },
            { $inc: { userSelectedQuantity } }, // Increment quantity
            { new: true } 
        );
    } else {
        // If the booking doesn't exist, create a new booking
        const result = await Booking.create({ productId, userId, userSelectedQuantity });
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