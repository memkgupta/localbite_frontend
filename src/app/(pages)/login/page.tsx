"use client"
import { BASE_URL } from '@/constants';
import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie'
import React, { FormEvent, useEffect, useState } from 'react'

import  { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { useUser } from '../../context/userContext';
const Login = () => {
const [formData,setFormData] = useState({
    email:'',
    password:''
});
const router = useRouter();
const {auth_status,setAuthStatus,setUser} = useUser();
const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handleSubmit =async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`,formData);
        console.log(res.data);
        if(res.status!=200){
     toast.error(res.statusText);
        }
        else{
            toast.success('Login Successful');
            Cookie.set('token',res.data.token,{expires:1});
            setAuthStatus(true);
            
            router.replace('/')
        }
    } catch (error:any) {
toast.error(error.message);
    }
}
useEffect(()=>{
  
  if(auth_status){
      router.replace('/');
  }
    },[])
  return (
    <div className="flex justify-center items-center h-screen bg-red-500">

    <div className="bg-white p-8 rounded-lg shadow-md w-80">
      <h2 className="text-2xl mb-4 text-center font-bold text-red-500">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input value={formData.email} onChange={handleChange} type="text" id="email" name='email' className="w-full border rounded-md px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input value={formData.password} onChange={handleChange} type="password" id="password" name='password' className="w-full border rounded-md px-3 py-2" />
        </div>
        <button  type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">Login</button>
      </form>
      <Link href={"/signup"} className='text-white font-normal'>Don't Have a account ? Sign up now</Link>
    </div>
  </div>
  )
}

export default Login