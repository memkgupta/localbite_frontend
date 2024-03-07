
"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContextProvider, useUser } from "../context/userContext";
import useCookie from "../hooks/useCookies";


import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "@/constants";
import { Toaster } from "sonner";
export default function ProtectedRoutes({children}:{children:React.ReactNode}){
    const [user,setUser]=useState<any>(undefined);
    const [auth_status,setAuthStatus]=useState(false)
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState('')
useEffect(()=>{
const token = useCookie('token');
console.log(token);
if(token){
 axios.get(`${BASE_URL}/user/me`,{headers:{Authorization:`Bearer ${token}`}}).then((res:AxiosResponse)=>{
    const data = res.data;
    if(res.status===200){
  
        setAuthStatus(true);
        setUser(data);
 
    }
 }).catch((error:AxiosError)=>{
setError(error.message);
 }).finally(()=>{
    setLoader(false)
 })
}
else{
    setLoader(false);
}
},[])
return(
    <UserContextProvider value={{user:user,auth_status:auth_status,setUser:setUser,setAuthStatus:setAuthStatus}}>
     <>
     {
        !loader ?   
      (<>
      <Navbar/>
      <div className="mt-24">
      {children}
      </div>
   
        <Toaster position="top-center" />
      </>):
        <div>Loading</div>
     }
     </>
    </UserContextProvider>
)
}