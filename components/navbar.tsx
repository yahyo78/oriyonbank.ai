import { BookMarked, MailCheck, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import img1 from "../public/logo.a6a2c873.svg"
const Navbar = () => {
  return (
    <div>
      <div className="w-[100%] shadow-md shadow-gray-200">
        <div className="flex gap-7 ml-[750px] mt-2">
          <div className="flex gap-2">
            <BookMarked size={16} color="#747272" className="mt-[2px] ml-2" />
            <p className="text-[#747272] hover:text-amber-400 cursor-pointer text-[15px]">
              Ҳуқуқҳои муштариён
            </p>
          </div>
          <div className="flex gap-2">
            <MailCheck size={16} color="#747272" className="mt-[2px] ml-2" />
            <p className="text-[#747272] hover:text-amber-400 cursor-pointer text-[15px]">
              Қабули шикоятҳо
            </p>
          </div>
          <div className="flex gap-2">
            <MapPin size={16} color="#747272" className="mt-[2px] ml-2" />
            <p className="text-[#747272] hover:text-amber-400 cursor-pointer text-[15px]">
              Офисҳо ва банкоматҳо
            </p>
          </div>
        </div>
        <hr className="w-[100%] border-[1px] border-solid border-gray-200 mt-3" />
        <div className="flex justify-center gap-20 mt-5 pb-4">
          <Image className="cursor-pointer" src={img1} alt="" />
          <p className="pt-3 text-[15px]">Барои шахсони воқеӣ</p>
          <p className="pt-3 text-[15px]">Барои тиҷорат</p>
          <p className="pt-3 text-[15px]">Дар бораи бонк</p>
          <p className="pt-3 text-[15px]">Бештар</p>
          <button className="w-40 h-11 bg-amber-300 cursor-pointer rounded-[15px]">
            Ориён Бизнес
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar
