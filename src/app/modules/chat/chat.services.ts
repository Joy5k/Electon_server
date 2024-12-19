import { Chat } from "./chat.model";


const getAllRoomsFromDB=async(roomEmail:string)=>{
    console.log(roomEmail)
    try{
        const rooms = await Chat.aggregate([
            { $sort: { timestamp: 1 } },
            { $group: { _id: "$room", latestMessage: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$latestMessage" } }
        ]);
        return rooms;
    }catch(err){
        console.error('Error fetching chat history:', err);
    }
}

export const chatServices={
    getAllRoomsFromDB
}