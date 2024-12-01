import { Schema, z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdValidation = z.custom((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Define the Zod validation schema for the sell history
const createSellHistoryValidationSchema = z.object({
  body: z.array(  // Expect an array instead of a single object
    z.object({
      sellerId: objectIdValidation,
      productId: objectIdValidation,
      soldProductQuantity: z.number()
        .int("Sold Product Quantity must be an integer")
        .min(1, "Sold Product Quantity must be at least 1"),
      soldSubtotal: z.number(),
      buyerId: objectIdValidation,
      paymentStatus: z.string(),
      paymentMethod: z.string(),
      sellerRevenue: z.number().optional(),
      platformFee: z.number().optional(),
    })
  ),
});


// Export the validation schema
export const sellsHistoryValidationSchema = {
  createSellHistoryValidationSchema,
};
