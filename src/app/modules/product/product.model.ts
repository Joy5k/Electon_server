
import { Schema, model } from 'mongoose';


const productSchema = new Schema<Iproduct>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    required: [true, 'Image is required'],
  },
  color: {
    type: String,
    trim: true,
    required: [true, 'Choose a color'],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, 'Product quantity is Required'],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'Choose a Product Price'],
  },
  rating: {
    type: Number,
    trim: true,
  },
});



export const Products = model<Iproduct>('Products', productSchema);