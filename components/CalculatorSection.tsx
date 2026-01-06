"use client";

import axios from "axios";
import React, { useState } from "react";

interface ApiResponse {
  input: {
    amount: number;
    days: number;
    early_day: number;
  };
  results: {
    classic: {
      type: string;
      name: string;
      rate_percent: number;
      income: number;
      total: number;
    };
    capitalization: {
      type: string;
      name: string;
      rate_percent: number;
      income: number;
      total: number;
    };
    ladder: {
      type: string;
      name: string;
      actual_days?: number;
      rate_percent?: number;
      income: number;
      total: number;
      note?: string;
    };
  };
  recommendation: string;
  diff_from_best: number;
}

export default function CalculatorSection() {
  const [amount, setAmount] = useState("");
  const [early_day, setEarlyDay] = useState("");
  const [term, setTerm] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCalculate = async () => {
    if (!amount || !term) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        amount: Number(amount),
        days: Number(term),
        early_day: Number(early_day) || 1,
      };

      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:8000/api/calculate/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setApiData(response.data);
      setCalculated(true);
    } catch (err: any) {
      console.error("API ERROR:", err);
      console.error("Error details:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
      });
      
      let errorMessage = "Не удалось рассчитать. Пожалуйста, попробуйте еще раз.";
      if (err.response?.status === 403) {
        errorMessage = "Ошибка аутентификации. Пожалуйста, проверьте данные для входа.";
      } else if (err.response?.status === 401) {
        errorMessage = "Не авторизован. Пожалуйста, проверьте данные для входа.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAmount("");
    setTerm("");
    setEarlyDay("");
    setCalculated(false);
    setApiData(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <style>{`
        .calc-input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        .calc-button-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 216, 77, 0.5) !important;
        }
        .calc-button-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .calc-button-secondary:hover {
          background-color: #e5e7eb !important;
          transform: translateY(-1px);
        }
        .calc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12) !important;
        }
        .calc-card-recommended:hover {
          box-shadow: 0 15px 50px rgba(255, 216, 77, 0.3) !important;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#ffd230" }}>
            Калькулятор вкладов
          </h1>
        </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Сумма вклада
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="100000 сомони"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="calc-input w-full px-4 py-4 pr-24 rounded-xl border-2 border-gray-200 text-lg focus:outline-none"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  сомони
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Срок (дни)
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Введите дни (например, 90, 180, 365)"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="calc-input w-full px-4 py-4 pr-20 rounded-xl border-2 border-gray-200 text-lg focus:outline-none"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  дней
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                День досрочного снятия
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="10"
                  value={early_day}
                  onChange={(e) => setEarlyDay(e.target.value)}
                  className="calc-input w-full px-4 py-4 pr-20 rounded-xl border-2 border-gray-200 text-lg focus:outline-none"
                  min="1"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  дней
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCalculate}
                disabled={!amount || !term || loading}
                className="calc-button-primary flex-1 px-8 py-4 bg-amber-300 hover:bg-amber-400 text-gray-900 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Расчет..." : "Рассчитать"}
              </button>
              {calculated && (
                <button
                  onClick={handleReset}
                  className="calc-button-secondary px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>

        {calculated && apiData && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Результаты расчета
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResultCard
                title={apiData.results.classic.name}
                income={`${formatNumber(apiData.results.classic.income)} сомони`}
                total={`${formatNumber(apiData.results.classic.total)} сомони`}
                rate={apiData.results.classic.rate_percent}
                description="Вклад с простыми процентами"
                recommended={apiData.recommendation === "classic"}
              />

              <ResultCard
                title={apiData.results.capitalization.name}
                income={`${formatNumber(apiData.results.capitalization.income)} сомони`}
                total={`${formatNumber(apiData.results.capitalization.total)} сомони`}
                rate={apiData.results.capitalization.rate_percent}
                description="Вклад с капитализацией"
                recommended={apiData.recommendation === "capitalization"}
              />

              <ResultCard
                title={apiData.results.ladder.name}
                income={`${formatNumber(apiData.results.ladder.income)} сомони`}
                total={`${formatNumber(apiData.results.ladder.total)} сомони`}
                rate={apiData.results.ladder.rate_percent}
                description={apiData.results.ladder.note || "Гибкий вклад"}
                actualDays={apiData.results.ladder.actual_days}
                recommended={apiData.recommendation === "ladder"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  title,
  income,
  total,
  rate,
  description,
  actualDays,
  recommended = false,
}: {
  title: string;
  income: string;
  total: string;
  rate?: number;
  description?: string;
  actualDays?: number;
  recommended?: boolean;
}) {
  return (
    <div
      className={`calc-card bg-white rounded-2xl p-6 shadow-lg relative ${
        recommended ? "calc-card-recommended border-2 border-amber-300" : "border-2 border-transparent"
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 -right-3 bg-amber-300 px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1 shadow-lg">
          <span>⭐</span>
          Рекомендуется
        </div>
      )}
      <div className="mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {rate !== undefined && (
            <div className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              {rate}%
            </div>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
        {actualDays && (
          <p className="text-xs text-gray-400 italic mt-1">Фактические дни: {actualDays}</p>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Доход
          </span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{income}</p>
        </div>
        <div className="h-px bg-gray-100"></div>
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            Общая сумма
          </span>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{total}</p>
        </div>
      </div>
    </div>
  );
}

