import { model, Schema } from "mongoose";
import { Iaddress, Iuser } from "./user.interface";

const addressSchema=new Schema<Iaddress>({
    district:{
        type:String,
        required:[true,"email is required"],

        trim:true
    },
    division:{
        type:String,
        required:[true,"email is required"],

        trim:true
    },
    postCode:{
        type:Number,
        required:[true,"postCode is required"]
    }
})


const userSchema=new Schema<Iuser>({
    firstName:{
        type:String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    lastName:{
        type:String,
        required:[true,"last Name is Required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    age:{
        type:Number,
        trim:true
    },
     email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        trim:true
     },
     phoneNumber:{
        type:String,
        trim:true
     },
     role:{
        type:String,
        default:"user",
        trim:true
     },
     address:addressSchema
})
export const Users = model<Iuser>('Users', userSchema);