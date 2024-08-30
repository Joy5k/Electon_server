import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { productServices } from "./product.services"




const getAllProducts=catchAsync(async(req,res)=>{
    const result= await productServices.getProductsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat Retrieved successfully!",
        data: result
    })
})
const getSingleProducts=catchAsync(async(req,res)=>{
    const productId=req.params
    const result= await productServices.getSingleProductFromDB(productId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat Retrieved successfully!",
        data: result
    })
})

export const productController={
    getAllProducts,
    getSingleProducts
}