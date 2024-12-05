import { Types } from "mongoose";

export type CategoryType = "pc" | "laptop" | "box" | "earphone" | "camera" |"others";

export interface IProduct {
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  category: CategoryType; // Restricts to predefined categories
  color: string[];
  rating?: number; // Optional field
  sellerId: Types.ObjectId; // MongoDB ObjectId
}
