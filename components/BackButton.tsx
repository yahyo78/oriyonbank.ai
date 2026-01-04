"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton({ step, onBack }) {
  if (step === 0 || step === 4) return null; // Hidden on step 0 and disabled on loading step (4)

  return (
    <button
      onClick={onBack}
      className="
        flex items-center gap-2
        px-3 py-2
        rounded-lg
        bg-white/80 backdrop-blur
        text-gray-700
        hover:bg-white hover:text-black
        shadow-sm
        transition-all
      "
    >
      <ArrowLeft size={18} />
      <span className="text-sm font-medium">Назад</span>
    </button>
  );
}
