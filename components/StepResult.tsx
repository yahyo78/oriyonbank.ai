"use client";

export default function StepResult({ amount, period, monthlyAdd }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">
          Результат
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          На основе введенных данных, вам подходит этот тип депозита:
        </p>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Инвестиционный депозит
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Начальная сумма:</strong> {amount} сомони</p>
            <p><strong>Срок:</strong> {period} месяцев</p>
            <p><strong>Ежемесячное пополнение:</strong> {monthlyAdd ? "Да" : "Нет"}</p>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Начать заново
        </button>
      </div>

      {/* ROBOT SIDE - Empty space for robot (handled in parent) */}
      <div className="w-1/2"></div>
    </div>
  );
}

