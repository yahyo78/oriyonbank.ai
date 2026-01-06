"use client";
import { BookMarked, Calculator, MailCheck, MapPin, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import img1 from "../public/logo.a6a2c873.svg"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname = usePathname();
  if(pathname  == "/chat")
  {
    return null
  }
  return (
    <div>
      <div className="w-[100%] fixed top-0 z-50 bg-white shadow-md shadow-gray-200">
        <div className="flex justify-between gap-20 mt-5 xl:px-[40px] pb-4">
          <Image className="cursor-pointer" src={img1} alt="" />


          <div className='flex gap-5'>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
