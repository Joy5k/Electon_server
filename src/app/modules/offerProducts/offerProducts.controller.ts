import catchAsync from "../../../shared/catchAsync";
import { offerProductServices } from "./offerProducts.services";

import { Request, Response } from 'express';
import { IOfferProduct } from './offerProducts.interface';
import sendResponse from "../../../shared/sendResponse";
import CustomError from "../../error/customError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
const createOfferProduct = catchAsync(async (req: Request, res: Response) => {
    const token=req.headers.authorization
    
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Your are not authorized to perform this action")
    }
    const decoded= jwtHelpers.verifyToken(token,config.jwt.jwt_access_secret as string)
    if(!decoded){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Your are not authorized to perform this action")
    }
    const payload = req.body as IOfferProduct;

    const result = await offerProductServices.createOfferProduct({...payload,offerProvider:decoded.userId}); 
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
        message:"All Offer Product fetched successfully",
        data:result
    })
})
const getDiscount=catchAsync(async(req:Request,res:Response)=>{
    const result=await offerProductServices.getDiscount();
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Discount Offer Product fetched successfully",
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
const updateOfferProduct=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const payload=req.body as IOfferProduct;
    const result=await offerProductServices.updateOfferProduct(id,payload);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Offer Product updated successfully",
        data:result
    })
})
const updateOfferProductStatus=catchAsync(async(req:Request,res:Response)=>{
    const result=await offerProductServices.updateOfferProductStatus(req.params.id);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Offer Product status updated successfully",
        data:result
    })
})

const deleteOfferProduct=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const result=await offerProductServices.deleteOfferProduct(id);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Offer Product deleted successfully",
        data:result
    })
})


export const offerProductController = {
    createOfferProduct,
    getGeneralOfferProductFromDB,
    getDiscount,
    getDealOfTheDayOfferProductFromDB,
    deleteOfferProduct,
    updateOfferProductStatus,
    updateOfferProduct
}
