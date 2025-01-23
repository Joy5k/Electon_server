import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { chatServices } from "./chat.services";
import { Request, Response } from "express";

const getAllRooms=catchAsync(async (req: Request, res: Response) => {
    const {room} = req.body;
    const rooms=await chatServices.getAllRoomsFromDB(room);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Chat history fetched successfully",
        data: rooms
    });
});

export const chatController={
    getAllRooms
}