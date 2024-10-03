import { model, Schema } from "mongoose";
import { Iaddress, TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const addressSchema=new Schema<Iaddress>({
    district:{
        type:String,
        required:[true,"email is required"],

        trim:true
    },
    division:{
        type:String,
        required:[true,"email is required"],

        trim:true
    },
    postCode:{
        type:Number,
        required:[true,"postCode is required"]
    }
})


const userSchema=new Schema<TUser>({
    firstName:{
        type:String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    lastName:{
        type:String,
        required:[true,"last Name is Required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    age:{
        type:Number,
        trim:true
    },
     email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        trim:true
     },
     phoneNumber:{
        type:String,
        trim:true
     },
     role:{
        type:String,
        default:"user",
        trim:true
     },
     needPasswordChange:{
        type:Boolean,
     },
     address:addressSchema
},
{
    timestamps: true,
  },

)


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await Users.findOne({ id }).select('+password');
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  
  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };
  





export const Users = model<TUser>('Users', userSchema);