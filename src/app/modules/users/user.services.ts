import httpStatus from "http-status"
import CustomError from "../../error/customError"
import { TUser } from "./user.interface"
import { Users } from "./user.model"
import { USER_STATUS } from "../../../shared/type"
import { ObjectId } from "mongodb"


const createAdminIntoDB=async(payload:{role:string})=>{
    
    console.log(payload)
}


const getAllUsersFromDB=async()=>{
    const result=await Users.find()
    return result
}

const getMeFromDB=async(id:string)=>{
    const result=await Users.findById(id)
    return result
}
const updateMeFromDB=async(payload:any,_id:string)=>{
    const isExist=await Users.findById({_id})
    if(!isExist){
        throw new CustomError(httpStatus.NOT_FOUND,"user not found")
    }

    const result=await Users.findByIdAndUpdate(new ObjectId(_id),payload,{
        new:true
    })
    return result
}
const blockUserIntoDB=async(status:USER_STATUS,_id:string)=>{
    const result=await Users.findByIdAndUpdate({
        _id,
        status
    })
    return result
}
const deleteUserFromDB=async(id:string)=>{
   const isExists=await Users.findById(id)
   if(!isExists){
   throw new CustomError(httpStatus.NOT_FOUND,"user is not available")
   }
    const result=await Users.findByIdAndDelete(id)
    return result
}



export const userServices={
    getAllUsersFromDB,
    getMeFromDB,
    updateMeFromDB,
    createAdminIntoDB,
    deleteUserFromDB,
    blockUserIntoDB,
   
}

