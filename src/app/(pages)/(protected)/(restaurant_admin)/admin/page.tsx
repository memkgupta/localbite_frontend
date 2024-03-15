// import { useRestaurant } from '@/app/context/restaurantContext';
import Link from 'next/link';
import React from 'react'

const page = () => {
  // const {data} = useRestaurant();
  return (
    <div>
        {/* {data.menu===null&&(
      <div className='bg-red-100 flex justify-center items-center rounded-md'>
<div className='grid gap-2'>
  <p>Congratulations You have registered your restaurant. Add Your Menu Items here</p>
  <Link className='bg-red-500 p-3 rounded-md text-white' href={"/admin/menu"}>Add Menu</Link>
</div>
      </div>
    )} */}
    </div>
  )
}

export default page