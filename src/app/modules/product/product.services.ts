import { Products } from "./product.model"


const getProductsFromDB=async()=>{
    const result= await Products.find()
    return result
}
const getSingleProductFromDB=async(id:string)=>{
    const result= await Products.findById(id)
    return result
}
const postProductIntoDB=async(payload:Iproduct)=>{
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
    postProductIntoDB,
    updateProduct,
    deleteProductFromDB
}