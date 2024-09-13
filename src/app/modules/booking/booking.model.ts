import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema=new Schema<TBooking>({
    userId:{
        type:String,
        require:[true,"User is required"],
        trim:true
    },
    productId:{
        type:String,
        require:[true,"product id is required"],
        trim:true
    }
})
export const Booking = model<TBooking>('Booking', bookingSchema);