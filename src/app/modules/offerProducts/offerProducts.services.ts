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

const getDiscount = async () => {
    const result = await OfferProduct.findOne({offerType:'general',offerStatus:true}).populate(['productId','offerProvider']);
    return result;
}
const getDealOfTheDayOfferProductFromDB = async () => {
    const result = await OfferProduct.findOne({offerType:'DealOfTheDay'});
    return result;
}

const updateOfferProduct= async (_id:string,offerProduct:IOfferProduct) => {
    const result = await OfferProduct.findByIdAndUpdate(_id,offerProduct,{new:true});
    return result;
}

const updateOfferProductStatus = async (_id: string) => {
    try {
      // Retrieve the current product
      const currentProduct = await OfferProduct.findById(_id);
      if (!currentProduct) {
        throw new Error("Product not found");
      }
  
      // Toggle the current offerStatus
      const updatedProduct = await OfferProduct.findByIdAndUpdate(
        _id,
        { $set: { offerStatus: !currentProduct.offerStatus } }, // Toggle offerStatus
        { new: true } // Return the updated document
      );
  
      return updatedProduct;
    } catch (error) {
      console.error("Error updating offer status:", error);
      throw error;
    }
  };
  
const deleteOfferProduct = async (id:string) => {
    const result = await OfferProduct.findByIdAndDelete(id);
    return result;
}
export const offerProductServices = {
    createOfferProduct,
    getGeneralOfferProductFromDB,
    getDiscount,
    getDealOfTheDayOfferProductFromDB,
    deleteOfferProduct,
    updateOfferProductStatus,   
    updateOfferProduct
}