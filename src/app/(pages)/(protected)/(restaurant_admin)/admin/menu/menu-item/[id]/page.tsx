'use client'
import useCookie from '@/app/hooks/useCookies';
import { useRestaurant } from '@/app/hooks/useRestaurant';
import { BASE_URL } from '@/constants';
import { MenuItem } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from 'sonner';
const page = ({params}:{params:{id:number}}) => {
const {data} = useRestaurant();
  const [menuItem,setMenuItem] = useState<any>({
    id:params.id,
    name: '', 
    costPrice:0,
    price: 0,
    preparationTime: '',       
    rating: 0,
    category: '',
    availability: false,
});
const token = useCookie('token');
const handleDelete = async()=>{
  const confiramtion = confirm("Are you sure you want to delete this menu item");
  if(confiramtion){
    try{
const res = await axios.delete(`${BASE_URL}/restaurant/delete_menu_item`,{params:{
  id:params.id,
  restaurant_id:data.id
},headers:{Authorization:`Bearer ${token}`}});
if(res.status===200){
toast.success("Item Deleted Successfully");
router.back();
}
    }
    catch(error:any){
console.log(error);
toast.error("Some Error Occurred")
    }
  }
}
const handleChange= (e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement|HTMLSelectElement>)=>{
setMenuItem({...menuItem,[e.target.name]:e.target.value});
}
const handleSubmit  = async()=>{
try {
 let formData = menuItem;
 formData.restaurant_id=data.id;
const res = await axios.put(`${BASE_URL}/restaurant/update_menu_item`,menuItem,{headers:{Authorization:`Bearer ${token}`}});
if(res.status===200){
  toast.success("Menu Item Updated Successfully")
  setMenuItem(res.data);
}
} catch (error:any) {
  toast.error("some error occured");
}

}
  const router = useRouter();

  useEffect(()=>{
axios.get(`${BASE_URL}/restaurant/menu_item/${params.id}`,{headers:{Authorization:`Bearer ${token}`}})
.then((res)=>{
  if(res.status===200){
    setMenuItem(res.data);
  }
})
.catch((err:any)=>{
  toast.error(err.message);
});

return (()=>{
  
})
  },[])
  return (
    <div className='z-20 bg-white bg-opacity-45 flex justify-center items-center w-full h-screen fixed top-0'>
    <div className='bg-red-50 shadow-md rounded-md p-12 w-4/6 relative'>
<span className='absolute  p-3 cursor-pointer ' style={{top:'5px',right:'5px'}} onClick={()=>{router.back()}}>
  <IoIosCloseCircle fill='red' size={30}/>
</span>
{/* form */}
{
  menuItem &&
  <div className='bg-red-50 mx-2 rounded-md shadow-md'>
    <form onSubmit={handleSubmit} className=" py-4  grid sm:grid-cols-2 md:grid-cols-4 px-12 gap-5 items-center">
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={menuItem.name}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
    {/* <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={menuItem.}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      ></textarea>
    </div> */}
    <div className="mb-4">
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        Price
      </label>
      <input
        type="number"
        id="price"
        name="price"
        value={menuItem.price}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">
        Cost Price
      </label>
      <input
        type="number"
        id="costPrice"
        name="costPrice"
        value={menuItem.costPrice}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-700">
        Preparation Time
      </label>
      <input
        type="text"
        id="preparationTime"
        name="preparationTime"
        value={menuItem.preparationTime}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
        Rating
      </label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={menuItem.rating}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={menuItem.category}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      >
        <option value="">Select a category</option>
        <option value="ITALIAN">Italian</option>
        <option value="INDIAN">Indian</option>
        <option value="FAST_FOOD">Fast Food</option>
        <option value="CHINESE">Chinese</option>
        <option value="SHAKES">Shakes</option>
        <option value="VEGAN">Vegan</option>
      </select>
    </div>
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="availability"
          name="availability"
          checked={menuItem.availability}
          onChange={(e) => setMenuItem({ ...menuItem, availability: e.target.checked })}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="availability" className="ml-2 block text-sm text-gray-900">
          Available
        </label>
      </div>
    </div>
  
  </form>
  <div className="flex justify-center gap-3">
      <button
      onClick={handleSubmit}
      className="bg-red-500 cols-span-4 flex justify-center text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
    >
      Update Menu Item
    </button>
    <button
      onClick={handleDelete}
      className="bg-red-500 cols-span-4 flex justify-center text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
    >
      Delete Menu Item
    </button>
  </div>
   </div>
}

    </div>


    </div>
  )
}

export default page