import mongoose, { Schema, Document } from "mongoose";
import { ISellsHistory } from "./sellsHistory.interface";

const SellsHistorySchema = new Schema<ISellsHistory>({
    sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    soldProductQuantity: { type: Number, required: true },
    soldSubtotal: { type: Number, required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    soldAt: { type: Date, default: Date.now },
    paymentStatus: { type: String, required: true },
    paymentMethod: { type: String },
    platformFee: { type: Number, default: 0 },
    sellerRevenue: { type: Number, default: 0 },
});

export const SellsHistory = mongoose.model<ISellsHistory>("SellsHistory", SellsHistorySchema);
