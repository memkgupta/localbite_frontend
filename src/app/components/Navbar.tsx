// components/Navbar.tsx
"use client"
import React, { useState } from 'react';
import { IoMdArrowBack, IoMdSearch } from "react-icons/io";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import SideMenu from './SideMenu';
import { FaCartShopping } from 'react-icons/fa6';
import { useUser } from '../hooks/useUser';
const Navbar: React.FC = () => {
    const {auth_status} = useUser();
    const [toggle,setToggle] = useState<boolean>(false);
    const [searchToggle,setSearchToggle]=useState<boolean>(false);
  return (
<nav 
className='px-24 mx-auto w-full fixed top-0 z-10 py-2  flex justify-between items-center'
>
    {toggle&&<SideMenu toggle={toggle} setToggle={setToggle}/>}
<div className='flex gap-7 items-center'>
    <span onClick={()=>{setToggle(!toggle)}} className='p-2 cursor-pointer'><GiHamburgerMenu  size={30}/></span>
    <img className='hidden md:block object-contain max-w-[10rem] h-12 rounded-full' src='./logo.png' alt='logo'></img>

</div>
<div className="flex items-center gap-3">
    {/* Search bar */}
<div className={` flex items-center h-11 gap-1 sm:bg-gray-200 rounded-full p-2`}> 
    <span className=' text-gray-800 cursor-pointer sm:cursor-default' onClick={()=>{setSearchToggle(!searchToggle)}}><IoMdSearch size={30}/></span>
    <input type="text" className='hidden sm:block text-sm font-poppins appearance-none bg-transparent outline-none' name="search" id="search" placeholder='Search food items and restaurants' />
</div>
{/* Search bar modal */}
<div className={`${!searchToggle?'hidden':''} sm:hidden z-20 absolute top-0  flex items-center w-4/6 mx-auto h-11 gap-1 bg-gray-200 rounded-full `}> 
    <span className=' text-gray-800 cursor-pointer sm:cursor-default' onClick={()=>{setSearchToggle(!searchToggle)}}><IoMdArrowBack size={30}/></span>
    <input type="text" className=' text-sm font-poppins appearance-none bg-transparent outline-none' name="search" id="search" placeholder='Search food items and restaurants' />
</div>
{/* Cart */}
<button className='bg-red-600 text-white px-8 py-2 text-sm rounded-md'><FaCartShopping/></button>
{
    auth_status?<Link className='text-slate-950 mx-2 font-bold text-sm' href={"/account"}>Account</Link>:
    (<>
    <Link className='text-slate-950 mx-2 font-bold text-sm' href={"/login"}>Sign In</Link>
<Link className='text-slate-950 mx-2 font-bold text-sm' href={"/signup"}>Sign Up</Link>
    </>)
}
</div>
</nav>
  );
};

export default Navbar;
