import { useRestaurant } from '@/app/hooks/useRestaurant';
import { MenuItem } from '@/types';
import React, { useEffect, useRef, useState } from 'react'

const MenuItemFilterBox = () => {
    const prevQueryLenght = useRef(0);
    const [categ,setCateg] = useState("");
    const [query,setQuery]=useState("");
    const {data,setData} = useRestaurant();
    const copyMenu = data.menuItems;
    const[itemCopy,setItemCopy]=useState(data.menuItems);
   const filterMenu = ():MenuItem[]=>{
    if(prevQueryLenght.current<query.length){
        console.log(copyMenu)
        prevQueryLenght.current = query.length;
return itemCopy.filter((item)=>{
   
    return (item.name.includes(query)&&(categ!=""?item.category===categ:true))
})
    }
    else{
        prevQueryLenght.current = query.length;
        
setItemCopy(copyMenu);
return itemCopy.filter((item)=>{
    return (item.name.includes(query)&&(categ!=""?item.category===categ:true))
})

    }
    
}
    useEffect(()=>{

setData({...data,menuItems:filterMenu()})
console.log(query)
    },[categ,query]);
  return (
    <div className='flex justify-center my-6 gap-5'>
<input onChange={(e)=>{setQuery(e.target.value)}} value={query} type="text" placeholder='Filter By Name' className=' w-3/6 rounded-md py-3 outline-none border focus:ring-1 ring-red-400' />
    <select value={categ} onChange={(e)=>{setCateg(e.target.value)}}  className=' appearance-none border border-red-200 focus:ring-1 ring-red-400'>
    <option value="">Select a category</option>
        <option value="ITALIAN">Italian</option>
        <option value="INDIAN">Indian</option>
        <option value="FAST_FOOD">Fast Food</option>
        <option value="CHINESE">Chinese</option>
        <option value="SHAKES">Shakes</option>
        <option value="VEGAN">Vegan</option>
    </select>
    </div>
  )
}

export default MenuItemFilterBox