import { useRestaurant } from '@/app/hooks/useRestaurant';
import useCookie from '@/app/hooks/useCookies';
import { BASE_URL } from '@/constants';
import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useRestaurantStore } from '@/lib/store';

const MenuItem = () => {
    const {data,setData}=useRestaurant();
    const [menuItem, setMenuItem] = useState<any>({
        restaurant_id: data.id?data.id:0,
        name: '',
        description: '',
        price: 0,
        preparationTime: '',
        costPrice:0,
        rating: 0,
        category: '',
        availability: false,
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMenuItem({
          ...menuItem,
          [name]: value,
        });
      };
      const handleSubmit = async(e:FormEvent)=>{
        const token = useCookie('token');
      if(data.id!=0){
        
        console.log(data.id);
        try {
            var men = menuItem
        ;
        men.restaurant_id = data.id?data.id:0
            setMenuItem(men);
            const res = await axios.put(`${BASE_URL}/restaurant/add_menu_item`,menuItem,{headers:{Authorization:`Bearer ${token}`}})
              if(res.status===200){
                toast.success("Menu Item Added Successfully");
                let menuItems = data.menuItems;
                menuItems.unshift(res.data);
                setData({...data,menuItems:menuItems})
               
              }          
                    } catch (error:any) {
                        toast.error("Some error occured");
                    }
      }
      else{
        toast.error("Data loading")
      }
      }
      useEffect(()=>{
        console.log(data);
      },[data])
  return (
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
    <div className="mb-4">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={menuItem.description}
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
        required
      ></textarea>
    </div>
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
  <div className="flex justify-center">
      <button
      onClick={handleSubmit}
      className="bg-red-500 cols-span-4 flex justify-center text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
    >
      Add Menu Item
    </button>
  </div>
   </div>
  )
}

export default MenuItem