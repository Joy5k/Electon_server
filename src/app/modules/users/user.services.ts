import { Iuser } from "./user.interface"
import { Users } from "./user.model"

const registerUser=async(payload:Iuser)=>{
    const result=await Users.create(payload)
    return result

}
const loginUser=async (payload:any)=>{
     const result=await Users.find()
     return result

}
const getAllUsersFromDB=async()=>{
    const result=await Users.find()
    return result

}
const getMeFromDB=async(email:string)=>{
    const result=await Users.findOne({email})
    return result

}
const deleteUserFromDB=async(id:string)=>{
    const result=await Users.findByIdAndDelete(id)
    return result
}
export const userServices={
    getAllUsersFromDB,
    getMeFromDB,
    registerUser,
    loginUser,
    deleteUserFromDB
}

