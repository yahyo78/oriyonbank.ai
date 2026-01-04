"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import StepWelcome from "@/components/StepWelcome";
import StepAmount from "@/components/StepAmount";
import StepPeriod from "@/components/StepPeriod";
import StepAdd from "@/components/StepAdd";
import StepLoading from "@/components/StepLoading";
import StepResult from "@/components/StepResult";
import ProgressBar from "@/components/ProgressBar";
import BackButton from "@/components/BackButton";

const TOTAL_STEPS = 6;

export default function StepsPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevStepRef = useRef(0);

  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<number | null>(null);
  const [monthlyAdd, setMonthlyAdd] = useState<boolean | null>(null);

  useEffect(() => {
    if (step > prevStepRef.current) setDirection(1);
    if (step < prevStepRef.current) setDirection(-1);
    prevStepRef.current = step;
  }, [step]);

  const next = () => step < TOTAL_STEPS - 1 && setStep(step + 1);
  const back = () => step > 0 && step !== 4 && setStep(step - 1);
  const onLoadingComplete = () => setStep(5);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div className=" bg-gray-50">
      {/* Progress */}
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {/* Back */}
      <div className="px-[230px] pt-[50px]">
        <BackButton step={step} onBack={back} />
      </div>

      {/* MAIN */}
      <div className="min-h-[400px] flex items-center justify-center ">
        <div className="w-full max-w-6xl px-12">
          <div className="flex items-center gap-12">
            {/* LEFT — TEXT / STEPS */}
            <div className="w-1/2">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 0 && (
                  <motion.div
                    key="s0"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                  >
                    <StepWelcome onNext={next} />
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="s1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <StepAmount
                      amount={amount}
                      setAmount={setAmount}
                      onNext={next}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="s2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <StepPeriod
                      period={period}
                      setPeriod={setPeriod}
                      onNext={next}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="s3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <StepAdd
                      monthlyAdd={monthlyAdd}
                      setMonthlyAdd={setMonthlyAdd}
                      onNext={next}
                    />
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="s4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <StepLoading onComplete={onLoadingComplete} />
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    key="s5"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <StepResult
                      amount={amount}
                      period={period}
                      monthlyAdd={monthlyAdd}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT — ROBOT */}
            <div className="w-1/2 flex justify-end">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/robot.png"
                  alt="AI Robot"
                  width={520}
                  height={520}
                  priority
                  className="select-none drop-shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
