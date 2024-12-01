import { ISellsHistory } from "./sellsHistory.interface";
import { SellsHistory } from "./sellsHistory.model";
import { Types } from "mongoose";

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
      return {
        success: false,
        message: "This record already exists. Duplicate entries are not allowed.",
      };
    }
  }

  // If no duplicate is found, create new records
  const result = await SellsHistory.insertMany(convertedPayload);
  console.log(result);

  return {
    success: true,
    message: "Records created successfully.",
    data: result,
  };
};

export const sellsHistoryServices = {
  createSellHistoryIntoDB,
};
