import { Schema, z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdValidation = z.custom((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Define the Zod validation schema for the sell history
const createSellHistoryValidationSchema = z.object({
  body: z.object({
    sellerId: objectIdValidation, // Custom validation for sellerId (ObjectId)
    productId: objectIdValidation, // Custom validation for productId (ObjectId)
    soldProductQuantity: z.number({
      required_error: "Sold Product Quantity is required",
    }).int("Sold Product Quantity must be an integer")
      .min(1, "Sold Product Quantity must be at least 1"),
    soldSubtotal: z.number({
      required_error: "Sold Subtotal is required",
    }),
    buyerId: objectIdValidation, // Custom validation for buyerId (ObjectId)

    paymentStatus: z.string({
      required_error: "Payment Status is required",
    }),
    paymentMethod: z.string({
      required_error: "Payment Method is required",
    }),
    sellerRevenue: z.number().optional(), // Optional field
    platformFee: z.number().optional(), // Optional field
  }),
});

// Export the validation schema
export const sellsHistoryValidationSchema = {
  createSellHistoryValidationSchema,
};
