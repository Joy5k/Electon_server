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
    const result = await OfferProduct.findOne({offerType:'General'});
    return result;
}


export const offerProductServices = {
    createOfferProduct,
    getGeneralOfferProductFromDB
}