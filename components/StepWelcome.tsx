"use client";

export default function StepWelcome({ onNext }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4">
          Привет 👋
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Я AI помощник.  
          Я хочу задать вам несколько вопросов и на основе них
          проанализировать и сказать, какой тип
          депозита нашего банка вам подходит.
        </p>

        <button
          onClick={onNext}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Поехали 🚀
        </button>
      </div>
    </div>
  );
}
