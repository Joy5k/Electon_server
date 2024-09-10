import jwt from 'jsonwebtoken'
import config from '../app/config';


export const createToken=(data:any,hex:string)=>{
   return jwt.sign(data,hex);
}