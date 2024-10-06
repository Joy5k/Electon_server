import { Schema, z } from "zod";
import { Types } from "mongoose";

// Custom validation for ObjectId
const objectIdValidation = z.custom((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Define the Zod validation schema for the request
const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is missing",
    }).min(1, "Title cannot be empty"),
    
    description: z.string()
      .max(500, "Description can't exceed 500 characters"),
      
    
    image: z.string({
      required_error: "Image is missing",
    }).url("Image must be a valid URL"),
    
    price: z.number({
      required_error: "Price is required",
    }).positive("Price must be a positive number"),
    
    quantity: z.number({
      required_error: "Quantity is required",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
    
    color: z.array(z.string(), {
      required_error: "Color is required",
    }).min(1, "At least one color must be provided"),
    
    rating: z.number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating must be at most 5")
      .optional(),
    
    sellerId: objectIdValidation, // Custom validation for ObjectId
  }),
});
const updateProductValidationSchema=z.object({
    body: z.object({
        title: z.string({
          required_error: "Title is missing",
        }).min(1, "Title cannot be empty").optional(),
        
        description: z.string()
          .max(500, "Description can't exceed 500 characters")
          .optional(),
        
        image: z.string({
          required_error: "Image is missing",
        }).url("Image must be a valid URL").optional(),
        
        price: z.number({
          required_error: "Price is required",
        }).positive("Price must be a positive number").optional(),
        
        quantity: z.number({
          required_error: "Quantity is required",
        })
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1").optional(),
        
        color: z.array(z.string(), {
          required_error: "Color is required",
        }).min(1, "At least one color must be provided").optional(),
        
        rating: z.number()
          .min(0, "Rating must be at least 0")
          .max(5, "Rating must be at most 5")
          .optional(),
        
      }),
})
export const productValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema
};
