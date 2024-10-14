export type TAuth={
    email:string;
    id:string;
    role:string  
}
export type TRegister={
    firstName:string;
    lastName:string;
    gender:'male'|"female"|"other";
    phoneNumber?:string,
    email:string;
    password:string;
}