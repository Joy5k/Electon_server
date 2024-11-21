import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { productServices } from "./product.services"
import { Request, Response } from "express"
import { tokenDecoded } from "../../../shared/userAuth"
import CustomError from "../../error/customError"
import { JwtPayload } from "jsonwebtoken"
import { Users } from "../users/user.model"




const getAllProducts=catchAsync(async(req,res)=>{
    const result= await productServices.getProductsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products Retrieved successfully!",
        data: result,
        meta:{
            page:0,
            limit:20,
            total:result.length
        }
    })
})
const getAllMyProducts=catchAsync(async(req,res)=>{
    const token=req.headers.authorization
    if(!token){
        throw new CustomError(httpStatus.UNAUTHORIZED,"You are not authorized")
    }
    const decoded=tokenDecoded(token)as JwtPayload
    if(!decoded){
        throw new CustomError(httpStatus.UNAUTHORIZED,"Your not Authorized")
    }
    const result=await productServices.getAllMyProducts(decoded.userId) 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The Product Retrieved successfully!",
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
  try {
    const payload=req.body;
    const isSellerExist=await Users.findById(payload.sellerId)
    if(!isSellerExist){
        throw new CustomError(httpStatus.NOT_FOUND,"seller not available")
    }
    const result=await productServices.postProductIntoDB(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "The Product created successfully!",
        data: []
    })
  } catch (error) {
    throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR,"Something went wrong ")
  }
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
    getAllMyProducts,
    postProduct,
    updateProductIntoDB,
    deleteProduct
}