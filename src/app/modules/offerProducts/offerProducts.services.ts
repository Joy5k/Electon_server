import httpStatus from "http-status";
import CustomError from "../../error/customError";
import { OfferProduct } from "./offerProduct.model";
import { IOfferProduct } from "./offerProducts.interface";


const createOfferProduct = async (offerProduct:IOfferProduct) => {
    try {
        const result = await OfferProduct.create(offerProduct);
        return result;
    } catch (error) {
        console.error('Error in creating offerProduct:', error);
        throw new CustomError(httpStatus.UNPROCESSABLE_ENTITY,'Failed to create offerProduct');
    }
}
const getGeneralOfferProductFromDB = async () => {
    const result = await OfferProduct.find().populate(['productId','offerProvider']);
    return result
}

const getDealOfTheDayOfferProductFromDB = async () => {
    const result = await OfferProduct.findOne({offerType:'DealOfTheDay'});
    return result;
}

const updateOfferProduct= async (_id:string,offerProduct:IOfferProduct) => {
    const result = await OfferProduct.findByIdAndUpdate(_id,offerProduct,{new:true});
    return result;
}

const updateOfferProductStatus=async()=>{
    const result = await OfferProduct.updateMany({offerEndDate:{$lt:new Date()}},{offerStatus: true ? false:true});
    return result;
}

const deleteOfferProduct = async (id:string) => {
    const result = await OfferProduct.findByIdAndDelete(id);
    return result;
}
export const offerProductServices = {
    createOfferProduct,
    getGeneralOfferProductFromDB,
    getDealOfTheDayOfferProductFromDB,
    deleteOfferProduct,
    updateOfferProductStatus,   
    updateOfferProduct
}