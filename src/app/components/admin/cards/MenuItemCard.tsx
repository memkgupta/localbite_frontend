import { MenuItem } from '@/types'
import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from "react-icons/hi";
const MenuItemCard:React.FC<{item:MenuItem}> = ({item}) => {
  return (
    <div className='bg-red-50 rounded-xl p-2 grid relative min-w-[200px] content-end gap-2'>
<Link href={`/admin/menu/menu-item/${item.id}`} className="absolute top-0 right-0 rounded-full p-2 text-white bg-red-500">
    <HiPencilAlt/>
</Link>
<p className="text-black font-bold text-sm">{item.name}</p>
<div className="flex justify-between">
    <p className="font-bold">{item.price}</p>
    <p className={`text-sm ${item.availability?'text-green-500':'text-red-400'}`}>{item.availability?'InStock':'Out Of stock'}</p>
</div>
    </div>
  )
}

export default MenuItemCard