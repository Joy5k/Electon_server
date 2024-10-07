import { Types } from "mongoose";

export interface TBooking {
    userId: Types.ObjectId;   // Make it ObjectId
    productId: Types.ObjectId; // Make it ObjectId
    quantity:number;
}
