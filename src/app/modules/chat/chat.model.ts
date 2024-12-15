import { Schema } from "mongoose";
import { IChat } from "./chat.interface";

const createChattingSchema=new Schema<IChat> ({
    room:{
        type:String,
        required:[true,"Room unable to create! may have doesn't room email"]
    }
})