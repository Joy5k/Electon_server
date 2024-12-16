import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const chattingSchema=new Schema<IChat> ({
    sender: { type: String, required: [true, 'sender email is not available'] },
    room: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

})
export const Chat = model<IChat>('Chat', chattingSchema);

