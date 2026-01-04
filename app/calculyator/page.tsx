"use client";

import React, { useState } from "react";

export default function CalculatorPage() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    if (!amount || !term) return;
    setCalculated(true);
  };

  const handleReset = () => {
    setAmount("");
    setTerm("");
    setCalculated(false);
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
          <h1 style={styles.title}>Deposit Calculator</h1>
          <p style={styles.subtitle}>
            Calculate your potential earnings with different deposit options
          </p>
        </div>

        <div style={styles.formCard}>
          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelText}>Deposit Amount</span>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    placeholder="Enter amount"
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
                <span style={styles.labelText}>Term (Months)</span>
                <div style={styles.inputWrapper}>
                  <input
                    type="number"
                    placeholder="Enter term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    style={styles.input}
                    className="calc-input"
                    min="1"
                  />
                  <span style={styles.currency}>months</span>
                </div>
              </label>
            </div>

            <div style={styles.buttonGroup}>
              <button
                onClick={handleCalculate}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  opacity: !amount || !term ? 0.6 : 1,
                  cursor: !amount || !term ? "not-allowed" : "pointer",
                }}
                className="calc-button-primary"
                disabled={!amount || !term}
              >
                Calculate
              </button>
              {calculated && (
                <button
                  onClick={handleReset}
                  style={{ ...styles.button, ...styles.buttonSecondary }}
                  className="calc-button-secondary"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {calculated && (
          <div style={styles.resultsSection}>
            <h2 style={styles.resultsTitle}>Calculation Results</h2>
            <div style={styles.results}>
              <ResultCard
                title="Classic"
                income="833 333 сомони"
                total="1 833 333 сомони"
                description="Simple interest deposit"
              />

              <ResultCard
                title="Capitalization"
                income="1 111 083 сомони"
                total="2 111 083 сомони"
                description="Compound interest deposit"
                recommended
              />

              <ResultCard
                title="Ladder"
                income="1 083 556 сомони"
                total="2 083 556 сомони"
                description="Flexible term deposit"
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
  description,
  recommended = false,
}: {
  title: string;
  income: string;
  total: string;
  description?: string;
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
          Recommended
        </div>
      )}
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{title}</h3>
        {description && <p style={styles.cardDescription}>{description}</p>}
      </div>
      <div style={styles.cardContent}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Income</span>
          <span style={styles.statValue}>{income}</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total Amount</span>
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
  cardTitle: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "8px",
    letterSpacing: "-0.3px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
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
