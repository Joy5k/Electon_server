import mongoose, { Schema, Document } from "mongoose";
import { ISellsHistory } from "./sellsHistory.interface";

const SellsHistorySchema = new Schema<ISellsHistory>({
    sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Products" },
    soldProductQuantity: { type: Number, required: true },
    soldSubtotal: { type: Number, required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
    soldAt: { type: Date, default: Date.now },
    paymentStatus: { type: String,},
    paymentMethod: { type: String },
    platformFee: { type: Number, default: 0 },
    sellerRevenue: { type: Number, default: 0 },
});

export const SellsHistory = mongoose.model<ISellsHistory>("SellsHistory", SellsHistorySchema);
