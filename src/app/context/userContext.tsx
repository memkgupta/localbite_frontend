
'use client';
import  {  createContext, useContext, useState } from "react";
type user = {    
    name:string,
    email:string,
    phone:string,
    role:string
            }
interface UserContextProps{
    auth_status:boolean,
    user:user|undefined,
    setUser:(user:user)=>void,
    setAuthStatus:(status:boolean)=>void
                           }



 export const UserContext  = createContext<UserContextProps>
 ({auth_status:false,user:undefined,setUser: ():user|undefined => undefined,
 setAuthStatus: ():boolean => false})


 export const UserContextProvider = UserContext.Provider
    
 
 export const useUser = ()=>useContext(UserContext);