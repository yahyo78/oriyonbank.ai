"use client";

const periods = [
  { value: 3, label: "3 месяца" },
  { value: 6, label: "6 месяцев" },
  { value: 12, label: "12 месяцев" },
  { value: 24, label: "24 месяца" },
];

export default function StepPeriod({ onNext, period, setPeriod }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">
          Срок депозита
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Выберите срок депозита
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-6 py-4 rounded-xl border-2 transition ${
                period === p.value
                  ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={!period}
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

