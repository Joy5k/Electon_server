import { IUserEmailSubscription } from "./subscribe.interface";
import Subscription from "./subscribe.model";

const createSubscriber = async (subscriber: IUserEmailSubscription): Promise<IUserEmailSubscription> => {
    const result= await Subscription.create(subscriber);
    return result;
}

export const subscribeServices = {
    createSubscriber
}