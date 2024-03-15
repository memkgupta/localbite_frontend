"use client"
import { RestaurantContextProvider } from '@/app/context/restaurantContext';
import { useUser } from '@/app/context/userContext'
import useCookie from '@/app/hooks/useCookies';
import { BASE_URL } from '@/constants';
import { useRestaurantStore } from '@/lib/store';
import { Restaurant } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const RestaurantProtectedLayout = ({children}:{children:React.ReactNode}) => {
  const {user} = useUser();
  const router = useRouter();
  
  const [data,setData]=useState<Restaurant>({id:null,user_id:null,name:'',description:'',menuItems:[]});

  useEffect(()=>{
if(user?.role!=="RESTAURANT_ADMIN"){
  router.push('/404');
}
else{
  const token = useCookie('token');
  axios.get(`${BASE_URL}/restaurant/my_restaurant`,{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
   setData(res.data);
  })
  .catch((error:any)=>{
    console.log(error)
    toast.error("No Restaurant Found")
  })

}
  },[])

  return (

  <div>
    <RestaurantContextProvider value={{data,setData}}>
    {children}
    </RestaurantContextProvider>
   
  </div>
  )
}

export default RestaurantProtectedLayout