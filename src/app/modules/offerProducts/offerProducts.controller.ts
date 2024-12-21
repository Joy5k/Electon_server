import catchAsync from "../../../shared/catchAsync";
import { offerProductServices } from "./offerProducts.services";

import { Request, Response } from 'express';
import { IOfferProduct } from './offerProducts.interface';
import sendResponse from "../../../shared/sendResponse";
const createOfferProduct = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body as IOfferProduct;

    const result = await offerProductServices.createOfferProduct(payload); 
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Offer Product created successfully",
        data:result
    })
})

const getGeneralOfferProductFromDB=catchAsync(async(req:Request,res:Response)=>{
    const result=await offerProductServices.getGeneralOfferProductFromDB();
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"General Offer Product fetched successfully",
        data:result
    })
})

const getDealOfTheDayOfferProductFromDB=catchAsync(async(req:Request,res:Response)=>{
    const result=await offerProductServices.getDealOfTheDayOfferProductFromDB();
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Deal of the day Offer Product fetched successfully",
        data:result
    })
})
export const offerProductController = {
    createOfferProduct,
    getGeneralOfferProductFromDB,
    getDealOfTheDayOfferProductFromDB
}
