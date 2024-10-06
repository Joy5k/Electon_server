import { IProduct } from "./product.interface"
import { Products } from "./product.model"


const getProductsFromDB=async()=>{
    const result= await Products.find().populate("sellerId")
    return result
}
const getAllMyProducts=async(userId:string)=>{
const result=await Products.find({sellerId:userId})
return result
}
const getSingleProductFromDB=async(id:string)=>{
    const result= await Products.findById(id)
    return result
}

const postProductIntoDB=async(payload:IProduct)=>{
    const result= await Products.create(payload)
    return result
}

const updateProduct=async(id:string,payload:any)=>{
    const result = await Products.updateOne(
        { _id: id },  
        { $set: payload } 
      );
    return result
}

const deleteProductFromDB=async(id:string)=>{
    const result=await Products.deleteOne({_id:id})
    return result
}


export const productServices={
    getProductsFromDB,
    getSingleProductFromDB,
    getAllMyProducts,
    postProductIntoDB,
    updateProduct,
    deleteProductFromDB
}