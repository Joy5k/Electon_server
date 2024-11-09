import { Model, Types } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './../../../shared/type';

export  type IAddress={
    roadNo?:string,
    district:string,
    subDistrict:string,
    division:string,
    postCode:number,
    
}

export type TUser={
    firstName:string,
    lastName:string,
    password:string,
    age?:number,
    email:string,
    phoneNumber?:string,
    gender:'male'|"female"|"other";
    image?:string,
    role:string,
    address?:IAddress,
    friends?: Types.ObjectId[]; // Array of ObjectId references for friends
    status:USER_STATUS|'active',
    isDeleted:boolean,
    passwordChangedAt?: Date;
    auth2:boolean;
    secret: {
      ascii: string;
      hex: string;
      base32: string;
      otpauth_url: string;
    };
    needPasswordChange:boolean
}

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }

  export type TUserRole = keyof typeof USER_ROLE;