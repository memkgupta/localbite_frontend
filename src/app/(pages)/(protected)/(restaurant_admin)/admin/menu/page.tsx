'use client'
import MenuItemCard from '@/app/components/admin/cards/MenuItemCard';
import MenuItem from '@/app/components/admin/form/MenuItem';
import MenuItemFilterBox from '@/app/components/admin/form/MenuItemFilterBox';
import { useRestaurant } from '@/app/hooks/useRestaurant'
import { useRestaurantStore } from '@/lib/store';
import React, { useEffect, useState } from 'react'

const Menu = () => {
  const menuItems = useRestaurant().data.menuItems;
  return (
      <div>
        <MenuItem/>
        <p className='mt-12 text-center font-bold text-xl'>Menu Items</p>
        {/* <MenuItemFilterBox/> */}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-12  justify-items-center'>
        {menuItems?.map((item:any,index:any)=>(
            <MenuItemCard item={item} key={index}/>
            ))}
        </div>
      
      </div>
  )
}

export default Menu