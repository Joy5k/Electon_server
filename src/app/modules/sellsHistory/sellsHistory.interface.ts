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
    productPriceAtSale: number; // Price at the time of the sale
    productNameAtSale: string; // Snapshot of the product name
    isRefunded?: boolean; // If refunded
    refundedAmount?: number; // Amount refunded, if applicable
    sellerRevenue?: number; // Revenue earned by the seller
    platformFee?: number; // Fee charged by the platform
    meta?: any; // Dynamic field for future use
}
