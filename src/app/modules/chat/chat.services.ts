import { Chat } from "./chat.model";


const getAllRoomsFromDB=async()=>{
    try{
        const rooms=await Chat.find();
        return rooms;
    }catch(err){
        console.error('Error fetching chat history:', err);
    }
}

export const chatServices={
    getAllRoomsFromDB
}