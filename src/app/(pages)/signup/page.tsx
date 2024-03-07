"use client"
import { BASE_URL } from '@/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactPasswordChecklist from 'react-password-checklist';
import { toast } from 'sonner';
import { useUser } from '../../context/userContext';

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone,setPhone] = useState('');
    const {auth_status} = useUser();
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      if(password===confirmPassword){
    try {
        const res = await axios.post(`${BASE_URL}/auth/signup`,{email,password,phone,name});
        if(res.status===200){
 toast.success("Account Registered Successfully");
 Cookies.set('token',res.data.token);
router.replace('/');
        }
        else{
         toast.error(res.statusText||"Some error occured");
        }  
    } catch (error:any) {
        toast.error(error.message);
    }

      }
    };
  useEffect(()=>{
if(auth_status){
    router.replace('/');
}
  },[])
    return (
    <div className='bg-red-500 h-screen flex justify-center items-center'>
          <form onSubmit={handleSubmit} className="max-w-md my-auto mx-auto p-4 bg-white text-black  rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-red-500 focus:outline outline-red-400 text-black rounded  focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-red-500 focus:outline outline-red-400 text-black rounded  focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border border-red-500 focus:outline outline-red-400 text-black rounded  focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-red-500 focus:outline outline-red-400 text-black rounded  focus:ring-2 focus:ring-white"
          />
          <ReactPasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				valueAgain={confirmPassword}
				onChange={(isValid) => {}}
			/>
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-red-500 focus:outline outline-red-400 text-black rounded  focus:ring-2 focus:ring-white"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-red-400 hover:bg-red-500 rounded text-red-100 transition duration-300">Sign Up</button>
      </form>
    </div>
    );
}

export default Signup