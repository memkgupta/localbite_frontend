
import React, { Dispatch, SetStateAction } from 'react'
import { IoClose } from "react-icons/io5";
import { MdAccountCircle, MdHome } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import { IoMdHelpBuoy } from "react-icons/io";
import Link from 'next/link';
const SideMenu:React.FC<{toggle:boolean,setToggle:Dispatch<SetStateAction<boolean>>}> = ({toggle,setToggle}) => {
    const menuItems = [
        {title:'Home',link:'/home',icon:<MdHome/>},
        {title:'Offers',link:'/offers',icon:<MdLocalOffer/>},
        {title:'Help',link:'/help',icon:<IoMdHelpBuoy/>},
        {title:'Account',link:'/account',icon:<MdAccountCircle/>}
    ]
    const footerLinks = [
        {title:'About Us',link:'/about'},
        {title:'Partner With Us',link:'/partner-with-us'},
        
        {title:'Be A Localite',link:'/localite'},
        
    ]
  return (
    <div className='bg-white w-[300px]   min-h-screen fixed z-20 shadow-lg  top-0 left-0'>
        
       
        <span className=' cursor-pointer w-full pl-2' onClick={()=>{setToggle(!toggle)}}><IoClose size={30}/></span>
        <div className="grid mt-5 text-slate-950 font-bold font-poppins shadow-md">
{
    menuItems.map((item,index)=>(
        <Link href={item.link} key={item.link+index} className='hover:bg-gray-300 flex gap-3 cursor-pointer border-b border-gray-400 p-5 w-full'><span className='text-xl'>{item.icon}</span>{item.title}</Link>
    ))
}

        </div>
        <div className='mt-2 absolute bottom-0 w-full'>
            {
                footerLinks.map((item,index)=>(
                    <Link href={item.link} key={item.link+index} className='hover:bg-gray-300 font-normal flex gap-3 cursor-pointer border-b border-gray-400 p-5 w-full'>{item.title}</Link>
                ))
            }
        </div>
        </div>
  
    )
}

export default SideMenu