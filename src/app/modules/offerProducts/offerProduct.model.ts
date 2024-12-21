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
    },
    offerStartDate:{
        type:Date,
        required:true
    },
    offerEndDate:{
        type:Date,
        required:true
    },
  
    offerStatus:{
        type:Boolean,
        required:true
    },
    offerPercentage:{
        type:Number,
    },
    offerQuantity:{
        type:Number
    },
    offerType:{
        enum:['General','DealOfTheDay','Other'],
        default:'DealOfTheDay'
    }
},{timestamps:true});

export const OfferProduct= model<IOfferProduct>('OfferProduct',productSchema);

