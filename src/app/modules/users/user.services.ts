import httpStatus from "http-status"
import CustomError from "../../error/customError"
import { TUser } from "./user.interface"
import { Users } from "./user.model"
import { USER_STATUS } from "../../../shared/type"


const createAdminIntoDB=async(payload:{role:string})=>{
    
    console.log(payload)
}


const getAllUsersFromDB=async()=>{
    const result=await Users.find()
    return result
}

const getMeFromDB=async(email:string)=>{
    const result=await Users.findOne({email})
    return result
}
const updateMeFromDB=async(payload:any,_id:string)=>{
    const result=await Users.findByIdAndUpdate({
     _id,
     payload
    })
}
const blockUserIntoDB=async(status:USER_STATUS,_id:string)=>{
    console.log(status)
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

