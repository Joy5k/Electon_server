import { Users } from "./user.model"


const getAllUsersFromDB=async()=>{
    const result=await Users.find()
    return result
}
const getMeFromDB=async(email:string)=>{
    const result=await Users.findOne({email})
    return result
}
export const userServices={
    getAllUsersFromDB,
    getMeFromDB
}