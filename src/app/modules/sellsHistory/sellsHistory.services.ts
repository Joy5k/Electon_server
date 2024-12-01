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
const parsedStartDate = new Date(filters.startDate as string);
const parsedEndDate = new Date(filters.endDate as string);


// If your TypeScript is expecting a number, convert the Date to timestamp
const startDateTimestamp = parsedStartDate.getTime();
const endDateTimestamp = parsedEndDate.getTime();
console.log(parsedStartDate,endDateTimestamp)
// Query the database with the filters
const result = await SellsHistory.find({
    soldAt: { $gte: parsedStartDate, $lte: parsedEndDate }
});

return result
}



export const sellsHistoryServices = {
  createSellHistoryIntoDB,
  getAllSoldHistory
};
