"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function StepLoading({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Simulate AI thinking for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-between w-full">
      {/* TEXT SIDE */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">
          AI анализирует
        </h1>
        <p className="text-lg text-gray-600 mb-6 flex items-center gap-2">
          AI анализирует
          <span className="inline-flex gap-1">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="inline-block"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="inline-block"
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="inline-block"
            >
              .
            </motion.span>
          </span>
        </p>
      </div>

      {/* ROBOT SIDE - Empty space for robot (handled in parent) */}
      <div className="w-1/2"></div>
    </div>
  );
}

