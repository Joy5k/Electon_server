import { Types } from "mongoose";

export  interface IProduct{
    title:string;
    description:string;
    image:string;
    price:number;
    quantity:number;
    color:string[];
    rating?:number;
    sellerId:Types.ObjectId;
}