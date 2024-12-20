import  { Schema, model } from 'mongoose';
import { IUserEmailSubscription } from './subscribe.interface';


const SubscriptionSchema = new Schema<IUserEmailSubscription>({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
   
    isActive: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
  });

export const Subscription = model<IUserEmailSubscription>('Subscription', SubscriptionSchema);

