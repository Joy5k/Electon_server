
type Iaddress={
    roadNo?:string,
    district:string,
    division:string,
    postCode:number
}

interface Iuser{
    firstName:string,
    lastName:string,
    age?:number,
    email:string,
    phoneNumber?:string,
    image:string,
    address?:Iaddress
}