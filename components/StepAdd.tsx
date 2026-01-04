"use client";

export default function StepAdd({ onNext, monthlyAdd, setMonthlyAdd }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">
          Добавление суммы
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Хотите ли вы добавлять сумму каждый месяц?
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMonthlyAdd(true)}
            className={`flex-1 px-6 py-4 rounded-xl border-2 transition ${
              monthlyAdd === true
                ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            Да
          </button>
          <button
            onClick={() => setMonthlyAdd(false)}
            className={`flex-1 px-6 py-4 rounded-xl border-2 transition ${
              monthlyAdd === false
                ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            Нет
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={monthlyAdd === null}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продолжить
        </button>
      </div>

      {/* ROBOT SIDE - Empty space for robot (handled in parent) */}
      <div className="w-1/2"></div>
    </div>
  );
}

