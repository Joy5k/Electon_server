import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"




const getAllProducts=catchAsync(async(req,res)=>{
    const result= 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "FLat Deleted successfully!",
        data: result
    })
})

export const productController={
    getAllProducts
}