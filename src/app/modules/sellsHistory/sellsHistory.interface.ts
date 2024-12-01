import { Types } from "mongoose";

export interface ISellsHistory{
    sellerId:Types.ObjectId;
    productId:Types.ObjectId;
    soldProductQuantity:number;
    soldSubtotal:number;
    BuyerId:Types.ObjectId;
    

}