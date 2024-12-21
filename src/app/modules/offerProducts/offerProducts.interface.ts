import { Types } from "mongoose";

export interface IOfferProduct {
    productId:Types.ObjectId;
    offerProvider:Types.ObjectId;
    offerPrice:number;
    offerStartDate:Date;
    offerEndDate:Date;
    offerDescription?:string;
    offerImage?:string;
    offerStatus:boolean;
    offerPercentage:number;
    offerQuantity?:number;
    offerType:string;

}