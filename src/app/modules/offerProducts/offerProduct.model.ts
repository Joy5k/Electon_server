import { model, Schema } from "mongoose";
import { IOfferProduct } from "./offerProducts.interface";

const productSchema=new Schema<IOfferProduct>({
    productId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    offerProvider:{
        type:Schema.Types.ObjectId,
        required:true
    },
    offerPrice:{
        type:Number,
        required:true
    },
    offerStartDate:{
        type:Date,
        required:true
    },
    offerEndDate:{
        type:Date,
        required:true
    },
    offerDescription:{
        type:String
    },
    offerImage:{
        type:String
    },
    offerStatus:{
        type:Boolean,
        required:true
    },
    offerPercentage:{
        type:Number,
        required:true
    },
    offerQuantity:{
        type:Number
    },
    offerType:{
        type:String,
        required:true
    }
},{timestamps:true});

export const OfferProduct= model<IOfferProduct>('OfferProduct',productSchema);