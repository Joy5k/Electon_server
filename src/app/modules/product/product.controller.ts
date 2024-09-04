import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { productServices } from "./product.services"
import { Request, Response } from "express"




const getAllProducts=catchAsync(async(req,res)=>{
    const result= await productServices.getProductsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products Retrieved successfully!",
        data: result
    })
})
const getSingleProducts=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result= await productServices.getSingleProductFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Product Retrieved successfully!",
        data: result
    })
})

const postProduct=catchAsync(async(req,res)=>{
    const payload=req.body
    const result=productServices.postProductIntoDB(payload)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "The Product created successfully!",
        data: result
    })
})
const updateProductIntoDB=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params 
    const payload=req.body
    const result= await productServices.updateProduct(id,payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Product updated successfully!",
        data: result
    })
})

const deleteProduct=catchAsync(async(req,res)=>{
    const {id}=req.params
    const result=await productServices.deleteProductFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Product deleted successfully!",
        data: result
    })
})


export const productController={
    getAllProducts,
    getSingleProducts,
    postProduct,
    updateProductIntoDB,
    deleteProduct
}