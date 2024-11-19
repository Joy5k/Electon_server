import { z } from "zod";
import { Types } from "mongoose";

// Enum for user status
const USER_STATUS = z.enum(['active', 'inactive', 'banned']); // Update based on your actual status types
const USER_ROLE = z.enum(['admin', 'user', 'seller']); // Update based on your actual status types

// Address schema
const addressSchema = z.object({
  roadNo: z.string().optional(),
  district: z.string(),
  subDistrict: z.string(),
  division: z.string(),
  postCode: z.number(),
});

// Secret schema for authentication details
const secretSchema = z.object({
  ascii: z.string(),
  hex: z.string(),
  base32: z.string(),
  otpauth_url: z.string(),
});

// Main user validation schema
const userValidationSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    age: z.number().optional(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']),
    image: z.string().optional(),
    role: z.string(),
    address: addressSchema.optional(),
    friends: z.array(z.instanceof(Types.ObjectId)).optional(), // ObjectId array for friends
    status: USER_STATUS,
    isDeleted: z.boolean(),
    passwordChangedAt: z.date().optional(),
    auth2: z.boolean(),
    secret: secretSchema.optional(),
    needPasswordChange: z.boolean(),
  }),
});
const updateUserValidationSchema = z.object({
    body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      password: z.string().optional(),
      age: z.number().optional(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      image: z.string().optional(),
      role: z.string().optional(),
      address: addressSchema.optional(),
      friends: z.array(z.instanceof(Types.ObjectId)).optional(), // ObjectId array for friends
      status: USER_STATUS.optional(),
      isDeleted: z.boolean().optional(),
      passwordChangedAt: z.date().optional(),
      auth2: z.boolean().optional(),
      secret: secretSchema.optional(),
      needPasswordChange: z.boolean().optional(),
    }),
  });
  const createAdminValidationSchema=z.object({
    body:z.object({
      role:USER_ROLE
    })
  })
export const userValidation= { 
    userValidationSchema,
    updateUserValidationSchema,
    createAdminValidationSchema
 };
