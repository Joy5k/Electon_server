import { Products } from "./product.model"


const getProductsFromDB=async()=>{
    const result= await Products.find()
    return result
}
const getAllMyProducts=async()=>{

}
const getSingleProductFromDB=async(id:string)=>{
    const result= await Products.findById(id)
    return result
}

const postProductIntoDB=async(payload:IProduct)=>{
    const result= await Products.create(payload)
    console.log(result)
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