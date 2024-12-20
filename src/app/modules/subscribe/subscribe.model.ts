import mongoose, { Schema, Document } from 'mongoose';
import { IUserEmailSubscription } from './subscribe.interface';

interface ISubscription extends Document {
    email: string;
    subscribedAt: Date;
}

const SubscriptionSchema: Schema = new Schema<IUserEmailSubscription>({
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
    }
});

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;