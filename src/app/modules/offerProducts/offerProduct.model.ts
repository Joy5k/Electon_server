import { model, Schema } from "mongoose";
import { IOfferProduct } from "./offerProducts.interface";

const productSchema=new Schema<IOfferProduct>({
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Products',
        required:true
    },
    offerProvider:{
        type:Schema.Types.ObjectId,
        ref:'Users',
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
        enum:['general','dealOfTheDay','Other'],
        type:String,
        required:true
    }
},{timestamps:true});

export const OfferProduct= model<IOfferProduct>('OfferProduct',productSchema);

