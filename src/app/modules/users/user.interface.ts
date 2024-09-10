import { USER_STATUS } from './../../../shared/type';

export  type Iaddress={
    roadNo?:string,
    district:string,
    division:string,
    postCode:number,
    
}

export type Iuser={
    firstName:string,
    lastName:string,
    password:string,
    age?:number,
    email:string,
    phoneNumber?:string,
    image:string,
    role:string,
    address?:Iaddress,
    status:USER_STATUS|"active"
}