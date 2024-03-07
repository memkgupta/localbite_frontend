
"use client"
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function ProtectedRoutes({children}:{children:React.ReactNode}){
const {auth_status} = useUser();
const router = useRouter();
useEffect(()=>{
if(!auth_status){
router.replace('/login');
}
},[])
return(
    <>
    {children}
    </>
)
}