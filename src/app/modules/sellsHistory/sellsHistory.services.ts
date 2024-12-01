import httpStatus from "http-status";
import { ISellsHistory } from "./sellsHistory.interface";
import { SellsHistory } from "./sellsHistory.model";
import { Types } from "mongoose";
import CustomError from "../../error/customError";

const createSellHistoryIntoDB = async (payload: ISellsHistory[]) => {
  // Convert string IDs to ObjectIds
  const convertedPayload = payload.map((item) => ({
    ...item,
    sellerId: new Types.ObjectId(item.sellerId),
    productId: new Types.ObjectId(item.productId),
    buyerId: new Types.ObjectId(item.buyerId),
  }));

  // Loop through the payload array and check for duplicates
  for (const item of convertedPayload) {
    // Check if a record with the same sellerId, buyerId, and productId already exists
    const existingRecord = await SellsHistory.findOne({
      sellerId: item.sellerId,
      buyerId: item.buyerId,
      productId: item.productId,
    });

    // If a record exists, return a message indicating the duplicate
    if (existingRecord) {
     throw new CustomError(httpStatus.BAD_REQUEST,"This record already exists. Duplicate entries are not allowed.")
    }
  }

  const result = await SellsHistory.insertMany(convertedPayload);

  return result
};

const getAllSoldHistory = async (filters: { startDate?: string; endDate?: string }) => {
    // Initialize query object
    const query: any = {};

    // Check if startDate is provided and parse it
    if (filters.startDate) {
        const parsedStartDate = new Date(filters.startDate);
        if (isNaN(parsedStartDate.getTime())) {
            throw new Error('Invalid startDate format');
        }
        query.soldAt = { ...query.soldAt, $gte: parsedStartDate.getTime() };
    }

    // Check if endDate is provided and parse it
    if (filters.endDate) {
        const parsedEndDate = new Date(filters.endDate);
        if (isNaN(parsedEndDate.getTime())) {
            throw new Error('Invalid endDate format');
        }
        query.soldAt = { ...query.soldAt, $lte: parsedEndDate.getTime() };
    }

    // Query the database with the dynamic query object
    const result = await SellsHistory.find(query);

    return result;
};


const deleteSingleSoldHistory=async(id:string)=>{
    const result=await SellsHistory.deleteOne({_id:id})
    return result
}
export const sellsHistoryServices = {
  createSellHistoryIntoDB,
  getAllSoldHistory,
  deleteSingleSoldHistory
};
