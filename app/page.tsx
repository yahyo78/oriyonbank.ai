"use client"
import Image from "next/image";
import img1 from "../public/logo.a6a2c873.svg";
import { BookMarked, MailCheck, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import img2 from "../public/auto_4x_2291718894.webp"
import img3 from "../public/mt_4x_92d419464f.webp"
import "swiper/css";
export default function Home() {
  return (
    <>
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
      <div className="w-[77%] m-auto mt-10 shadow-md shadow-gray-300 rounded-[22px]">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className="w-[100%] rounded-[22px] bg-gray-50">
            <div className="flex">
              <Image className="w-150" src={img2} alt="" />
              <div className="mt-20">
                <p className="text-4xl font-semibold mb-8">Автоқарз</p>
                <p className="pr-35 mb-8 text-[17px] text-zinc-500">
                  Автоқарз қарзест, ки ниёзи Шуморо ба воситаи нақлиёт таъмин
                  менамояд
                </p>
                <button className="w-25 h-13 bg-amber-300 rounded-[12px]">
                  Бештар
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-[100%] rounded-[22px] bg-gray-50">
            <div className="flex">
              <Image className="w-150" src={img3} alt="" />
              <div className="mt-10">
                <p className="text-4xl font-semibold mb-6 mr-40">
                  Пардохтҳо ва интиқолҳо
                </p>
                <p className="pr-35 mb-8 text-[17px] text-zinc-500">
                  ҶСК "Ориёнбонк" бо хушнудӣ ба шумо хидматҳо оид ба амалисозии
                  интиқоли пулҳои байналмилалӣ, инчунин интиқолро дар дохили
                  Тоҷикистон бидуни кушодани суратҳисоби ҷорӣ пешниҳод менамояд.
                </p>
                <button className="w-25 h-13 bg-amber-300 rounded-[12px]">
                  Бештар
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <footer className="bg-white shadow-md rounded-xl p-8 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 text-gray-500">
            <Image src={img1} alt="Logo" className="mb-4" />
            <p className="text-gray-700 mb-2">
              Ҷумҳурии Тоҷикистон, ш. Душанбе, <br />
              хиёбони Рӯдакӣ 95/1 Ҳ/М: 20402972413691, <br />
              РМА: 020003038, РЯМ: 350101369
            </p>
            <p className="text-gray-700">
              
              Почтаи электронӣ:{" "}
              <a
                href="mailto:info@Oriyonbonk.tj"
                className="text-blue-600 hover:underline"
              >
                info@Oriyonbonk.tj
              </a>
            </p>
          </div>

          
          <div className="flex-1 text-gray-500">
            <p className="font-semibold text-2xl mb-2 text-black">2222</p>
            <p className="mb-2">Барои зангҳо дар дохили Тоҷикистон</p>
            <p className="mb-2 text-2xl text-black font-semibold">
              +992 (37) 221 05 68 <br />
              +992 44 610 22 00
            </p>
            <p className="mb-2">Барои зангҳо аз ҳар гӯшаи ҷаҳон</p>
            <p className="mb-2 text-2xl text-black font-semibold">+992 44 600 15 20</p>
            <p>Телефони боварии Бонки миллии Тоҷикистон</p>
          </div>

          <div className="flex-1 text-gray-500">
            <p className="font-semibold text-2xl mb-2 text-black">Вақти корӣ</p>
            <p className="mb-2">
              Рӯзҳои корӣ: душанбе - ҷумъа аз 08:00 то <br /> 17:00
            </p>
            <p className="mb-2">Шанбе: аз 09:00 то 12:00</p>
            <p className="mb-2">Якшанбе рузи истироҳат</p>
            <p>Қабули шаҳрвандон: ҳар рӯзи шанбе</p>
          </div>
        </div>
      </footer>
    </>
  );
}
