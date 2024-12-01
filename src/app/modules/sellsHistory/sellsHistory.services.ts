import { ISellsHistory } from "./sellsHistory.interface"
import { SellsHistory } from "./sellsHistory.model"


const createSellHistoryIntoDB=async(payload: ISellsHistory)=>{

    const result=await SellsHistory.create(payload)
    console.log(result)

    return result;
}

export const sellsHistoryServices={

    createSellHistoryIntoDB,
}