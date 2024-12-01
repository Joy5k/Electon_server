import { ISellsHistory } from "./sellsHistory.interface"


const createSellHistoryIntoDB=async(payload: ISellsHistory):Promise<void>=>{
    
    console.log(payload)
}

export const sellsHistoryServices={

    createSellHistoryIntoDB,
}