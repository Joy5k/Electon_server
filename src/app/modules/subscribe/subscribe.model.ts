import mongoose, { Schema, Document } from 'mongoose';
import { IUserEmailSubscription } from './subscribe.interface';

interface ISubscription extends Document {
    id?: string;
    email: string;
    subscribedAt: Date;
    isActive: boolean;
}

const SubscriptionSchema: Schema = new Schema<IUserEmailSubscription>({
    id: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;