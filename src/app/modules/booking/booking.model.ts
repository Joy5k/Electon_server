import { model, Schema, Types } from "mongoose";
import { TBooking } from "./booking.interface";

// Define the schema
const bookingSchema = new Schema<TBooking>({
    userId: {
        type: Schema.Types.ObjectId,  
        ref: 'Users', // Refers to User model
        required: [true, "User is required"]
    },
    productId: {
        type: Schema.Types.ObjectId, 
        ref: 'Products', // Refers to Product model
        required: [true, "Product ID is required"]
    },
    userSelectedQuantity:{
        type:Number,
        default:1
    }
},
{
    timestamps: true,
  });

// Export the model
export const Booking = model<TBooking>('Booking', bookingSchema);
