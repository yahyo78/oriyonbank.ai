"use client";
import './globals.css'
import Image from "next/image";
import { BookMarked, MailCheck, MapPin, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import img2 from "../public/auto_4x_2291718894.webp";
import img1 from "../public/logo.a6a2c873.svg";
import img3 from "../public/mt_4x_92d419464f.webp";
import Link from "next/link";
import "swiper/css";
import Navbar from "@/components/navbar";
import imageRobot from "../public/robot.png";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState, useRef } from "react";
import ChatDrawer from "@/components/ChatDrawer";
import CalculatorSection from "@/components/CalculatorSection";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleAskQuestion = () => {
    setIsChatOpen(true);
  };

  const handleCalculatorClick = () => {
    calculatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "end"
    });
  };
  return (
    <>
      <div className="w-[77%] m-auto mt-35 shadow-md shadow-gray-300 rounded-[22px]">

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="bg-gray-50 rounded-[22px]">
            <div className="flex items-center justify-between px-14 py-12 gap-12">

              {/* LEFT – TEXT */}
              <div className="max-w-xl pb-[100px]">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Депозит и расчет прибыли
                </h2>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  С помощью нашего калькулятора вы можете заранее рассчитать возможную прибыль
                  от вашего вклада и выбрать лучший тип вклада для себя.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={handleCalculatorClick}
                    className="px-8 py-3 bg-amber-300 hover:bg-amber-400 transition rounded-[14px] font-semibold"
                  >
                    Рассчитать
                  </button>

                  <button
                    onClick={handleAskQuestion}
                    className="px-8 py-3 border border-amber-300 text-amber-600 hover:bg-amber-50 transition rounded-[14px] font-semibold"
                  >
                    Задать вопрос
                  </button>
                </div>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="relative w-[580px] h-[380px] flex-shrink-0">
                <Image
                  src={imageRobot}
                  alt="Deposit illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* <SwiperSlide>Slide 2</SwiperSlide> */}
        </Swiper>
      </div >


      {/* Calculator Section - Right Side */}
      <div ref={calculatorRef} className="w-full mt-20 flex justify-center pr-4">
        <div className="w-[85%] max-w-6xl">
          <CalculatorSection />
        </div>
      </div>

      <button
        onClick={handleAskQuestion}
        className="px-3 fixed bottom-10 right-10 py-3 bg-amber-300 hover:bg-amber-400 transition rounded-[50px] font-semibold"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Drawer - No black overlay */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
