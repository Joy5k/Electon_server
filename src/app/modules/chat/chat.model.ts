import { Schema } from "mongoose";
import { IChat } from "./chat.interface";

const createChattingSchema=new Schema<IChat> ({
    room:{
        type:String,
        required:[true,"Room unable to create! may have doesn't room email"]
    },
    text:{
        type:String,
        required:[true,"message is required"],
        default:"N/A"
    },
    sender:{
        type:String,
        required:[true,"sender email is not available"]
    },

})