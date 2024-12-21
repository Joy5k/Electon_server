import httpStatus from 'http-status';
import CustomError from '../../error/customError';
import { IUserEmailSubscription } from './subscribe.interface';
import { Subscription } from './subscribe.model';

const createSubscriber = async (
  subscriber: IUserEmailSubscription
): Promise<IUserEmailSubscription> => {
  try {
    const result = await Subscription.create(subscriber);
    return result;
  } catch (error) {
    console.error('Error in creating subscriber:', error);
    throw new CustomError(httpStatus.UNPROCESSABLE_ENTITY,'Failed to create subscriber');
  }
};

const handleSubscriber = async (email:string)=>{
    try {
        const result=await Subscription.findOneAndUpdate({email},
            {
                isActive:true ? false : true
            }
        );
    } catch (error) {}
}

export const subscribeServices = {
  createSubscriber,
  handleSubscriber
};
