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
