import { model, Schema, Types } from "mongoose";
import { IAddress, TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const addressSchema=new Schema<IAddress>({
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


const userSchema=new Schema<TUser, UserModel>({
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
    gender: { type: String, enum: ['male', 'female','other'], default: 'male' },

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
     address:addressSchema,

     friends: [{ type: Types.ObjectId, ref: 'Users' }], // Correct reference to 'Users' model
     status: { type: String, enum: ['active', 'inactive'], default: 'active' },


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
    console.log(user.password)

    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  userSchema.statics.isUserExistsByCustomId = async function (_id: string) {
    
    return await Users.findOne({_id}).select('+password');
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
  





export const Users = model<TUser,UserModel>('Users', userSchema);

Users.syncIndexes();
