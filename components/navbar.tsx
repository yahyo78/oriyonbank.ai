import { BookMarked, MailCheck, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import img1 from "../public/logo.a6a2c873.svg"
const Navbar = () => {
  return (
    <div>
      <div className="w-[100%] shadow-md shadow-gray-200">
        <div className="flex justify-between gap-20 mt-5 xl:px-[40px] pb-4">
          <Image className="cursor-pointer" src={img1} alt="" />
          
          <button className="w-40 h-11 bg-amber-300 cursor-pointer rounded-[15px]">
            Ориён Бизнес
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar
