export const USER_ROLE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user',
    SELLER: 'seller'
  } as const; // This ensures the values are literal types.
  
export type User_Role={
    ADMIN?:string,
    SUPER_ADMIN?:string,
    USER?:string,
    SELLER?:string
}

export const USER_STATUS = {
    ACTIVE: "active",
    BLOCKED: "blocked",
    MUTED: "muted",
  } as const; // 'as const' ensures the values are readonly and treated as literals.
  
  export type TUser_Role = typeof USER_ROLE[keyof typeof USER_ROLE]; 
  // This will create a type like "ADMIN" | "SUPER_ADMIN" | "USER" | "SELLER"

  export type USER_STATUS = typeof USER_STATUS[keyof typeof USER_STATUS]; 
  // This creates a type with the literal values "active" | "blocked" | "muted".
  