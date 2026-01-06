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

export default function CalculatorPage() {
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

      console.log("SEND PAYLOAD:", payload);

      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:8000/api/calculate/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("RESPONSE:", response.data);
      setApiData(response.data);
      setCalculated(true);
    } catch (err: any) {
      console.error("API ERROR:", err);
      setError(
        err.response?.data?.message || "Не удалось рассчитать. Пожалуйста, попробуйте еще раз."
      );
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
    <>
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
      <div className="mt-20" style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>Калькулятор вкладов</h1>
            <p style={styles.subtitle}>
              Рассчитайте возможную прибыль от различных вариантов вкладов
            </p>
          </div>

          <div style={styles.formCard}>
            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelText}>Сумма вклада</span>
                  <div style={styles.inputWrapper}>
                    <input
                      type="number"
                      placeholder="100000 сомони"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={styles.input}
                      className="calc-input"
                      min="0"
                    />
                    <span style={styles.currency}>сомони</span>
                  </div>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelText}>Срок (дни)</span>
                  <div style={styles.inputWrapper}>
                    <input
                      type="number"
                      placeholder="Введите дни (например, 90, 180, 365)"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      style={styles.input}
                      className="calc-input"
                      min="1"
                    />
                    <span style={styles.currency}>дней</span>
                  </div>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelText}>День досрочного снятия</span>
                  <div style={styles.inputWrapper}>
                    <input
                      type="number"
                      placeholder="10"
                      value={early_day}
                      onChange={(e) => setEarlyDay(e.target.value)}
                      style={styles.input}
                      className="calc-input"
                      min="1"
                    />
                    <span style={styles.currency}>дней</span>
                  </div>
                </label>
              </div>

              {error && (
                <div style={styles.errorMessage}>
                  {error}
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button
                  onClick={handleCalculate}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    opacity: !amount || !term || loading ? 0.6 : 1,
                    cursor: !amount || !term || loading ? "not-allowed" : "pointer",
                  }}
                  className="calc-button-primary"
                  disabled={!amount || !term || loading}
                >
                  {loading ? "Расчет..." : "Рассчитать"}
                </button>
                {calculated && (
                  <button
                    onClick={handleReset}
                    style={{ ...styles.button, ...styles.buttonSecondary }}
                    className="calc-button-secondary"
                  >
                    Сбросить
                  </button>
                )}
              </div>
            </div>
          </div>

          {calculated && apiData && (
            <div style={styles.resultsSection}>
              <h2 style={styles.resultsTitle}>Результаты расчета</h2>
              <div style={styles.results}>
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
    </>
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
      style={{
        ...styles.card,
        ...(recommended ? styles.cardRecommended : {}),
      }}
      className={recommended ? "calc-card calc-card-recommended" : "calc-card"}
    >
      {recommended && (
        <div style={styles.badge}>
          <span style={styles.badgeIcon}>⭐</span>
          Рекомендуется
        </div>
      )}
      <div style={styles.cardHeader}>
        <div style={styles.cardTitleRow}>
          <h3 style={styles.cardTitle}>{title}</h3>
          {rate !== undefined && (
            <div style={styles.rateBadge}>
              {rate}%
            </div>
          )}
        </div>
        {description && <p style={styles.cardDescription}>{description}</p>}
        {actualDays && (
          <p style={styles.cardNote}>Фактические дни: {actualDays}</p>
        )}
      </div>
      <div style={styles.cardContent}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Доход</span>
          <span style={styles.statValue}>{income}</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Общая сумма</span>
          <span style={{ ...styles.statValue, ...styles.statValueTotal }}>
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    background: "#f7f8f9",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  title: {
    fontSize: "42px",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#ffd230", // зард
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: 400,
    maxWidth: "600px",
    margin: "0 auto",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    marginBottom: "48px",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  labelText: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#374151",
    letterSpacing: "0.3px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "16px 100px 16px 20px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    flex: "1",
    transition: "all 0.3s ease",
    outline: "none",
    fontWeight: 500,
  },
  currency: {
    position: "absolute",
    right: "16px",
    fontSize: "14px",
    color: "#9ca3af",
    fontWeight: 500,
    pointerEvents: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  button: {
    padding: "16px 32px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "none",
    letterSpacing: "0.3px",
  },
  buttonPrimary: {
    backgroundColor: "#FFD84D",
    color: "#1f2937",
    flex: 1,
    boxShadow: "0 4px 14px rgba(255, 216, 77, 0.4)",
  },
  buttonSecondary: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
    padding: "16px 24px",
  },
  resultsSection: {
    marginTop: "48px",
  },
  resultsTitle: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "32px",
    color: "#1f2937",
    textAlign: "center",
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "28px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    position: "relative",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    overflow: "hidden",
  },
  cardRecommended: {
    border: "2px solid #FFD84D",
    boxShadow: "0 10px 40px rgba(255, 216, 77, 0.25)",
    transform: "scale(1.02)",
  },
  badge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "#FFD84D",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#1f2937",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 4px 12px rgba(255, 216, 77, 0.4)",
    letterSpacing: "0.3px",
  },
  badgeIcon: {
    fontSize: "14px",
  },
  cardHeader: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #f3f4f6",
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
    gap: "12px",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#1f2937",
    margin: 0,
    letterSpacing: "-0.3px",
    flex: 1,
  },
  rateBadge: {
    backgroundColor: "#667eea",
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "4px 0 0 0",
  },
  cardNote: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: "4px 0 0 0",
    fontStyle: "italic",
  },
  errorMessage: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    border: "1px solid #fecaca",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  statLabel: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#1f2937",
    letterSpacing: "-0.5px",
  },
  statValueTotal: {
    fontSize: "28px",
    color: "#667eea",
  },
  divider: {
    height: "1px",
    backgroundColor: "#f3f4f6",
    margin: "4px 0",
  },
};
