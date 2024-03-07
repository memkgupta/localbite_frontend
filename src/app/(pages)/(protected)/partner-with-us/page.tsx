
"use client"
import { BASE_URL } from '@/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Toaster, toast } from 'sonner';
const Partner = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    try {
        const token = Cookies.get('token');
        if(token){
            const res = await axios.post(`${BASE_URL}/restaurant/register_restaurant`,{name,desc,address,contact_number:contactNumber,latitude,longitude},{headers:{Authorization:`Bearer ${token}`}})
if(res.status===200){
    toast.success("Restaurant Registered Successfully");
}
else{
    toast.message(res.statusText);
}
        }
        else{
            toast.error("Login First");
        }
    } catch (error) {
        
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <div>
        
<form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white text-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Restaurant Details</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder='Name of your restaurant'
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="desc" className="block mb-1">Description:</label>
        <textarea
          id="desc"
          value={desc}
          placeholder='Brief description of your restaurant'
          onChange={(e) => setDesc(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-1">Address:</label>
        <textarea
         
          id="address"
          placeholder='Your Restaurant Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="contactNumber" className="block mb-1">Contact Number:</label>
        <input
          type="tel"
          id="contactNumber"
          maxLength={10}
          value={contactNumber}
          placeholder='Your Contact Number'
          onChange={(e) => setContactNumber(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      <button type="submit" className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Submit</button>
    </form>

    </div>
  )
}

export default Partner