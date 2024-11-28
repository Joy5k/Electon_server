import httpStatus from "http-status"
import CustomError from "../../error/customError"
import { Users } from "./user.model"
import { ObjectId } from "mongodb"

const createAdminIntoDB = async (_id: string) => {
    try {
      // Validate _id and find the user
      const isExistUser = await Users.findOne({
        _id,
        status: "active", // Add status filter
      });
  
      if (!isExistUser) {
        throw new Error("User not found or not active");
      }
  
  
    //   Uncomment this section if you want to update the user's role
      const newStatus = isExistUser.role === "admin" ? "user" : "admin";
  
      const result = await Users.updateOne(
        { _id, status: "active" },
        { $set: { role: newStatus } },
        {new:true}
      );
      return result;
  
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating admin:", error.message);
        throw new Error(error.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  };
  
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
const changeRoleUserToSellerIntoDB=async(_id:string)=>{
  try {
    // Validate _id and find the user
    const isExistUser = await Users.findOne({
      _id,
      status: "active", // Add status filter
    });

    if (!isExistUser) {
      throw new Error("User not found or not active");
    }


  //   Uncomment this section if you want to update the user's role
    const newStatus = isExistUser.role === "user" ? "seller" : "user";

    const result = await Users.updateOne(
      { _id, status: "active" },
      { $set: { role: newStatus } },
      {new:true}
    );
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating seller:", error.message);
      throw new Error(error.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}


const blockUserIntoDB = async ( _id: string) => {
    try {
      // Check the current status of the user
      const user = await Users.findById(_id);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Toggle the status
      const newStatus = user.status === "active" ? "blocked" : "active";
  
      // Update the user with the new status
      const result = await Users.findByIdAndUpdate(
        _id,
        { status: newStatus },
        { new: true } // Return the updated document
      );
  
      return result;
    } catch (error:any) {
      console.error("Error updating user status:", error.message);
      throw new Error(error.message);
    }
  };
  
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
    changeRoleUserToSellerIntoDB
   
}

