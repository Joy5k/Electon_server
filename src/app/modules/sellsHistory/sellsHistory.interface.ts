import { Types } from "mongoose";

export interface ISellsHistory {
    sellerId: Types.ObjectId;
    productId: Types.ObjectId;
    soldProductQuantity: number;
    soldSubtotal: number;
    buyerId: Types.ObjectId;
    soldAt: Date; // Timestamp of the sale
    paymentStatus: string; // "paid", "pending", etc.
    paymentMethod: string; // "credit card", "paypal", "cash", etc.
    sellerRevenue?: number; // Revenue earned by the seller
    platformFee?: number; // Fee charged by the platform

}
