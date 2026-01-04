"use client";

export default function StepAmount({ onNext, amount, setAmount }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">
          Начальная сумма
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Введите начальную сумму депозита
        </p>

        <div className="mb-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Например: 10000"
            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-600 transition"
          />
        </div>

        <button
          onClick={onNext}
          disabled={!amount || parseFloat(amount) <= 0}
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

