"use client";

export default function StepIndicator({ step, total = 5 }) {
  return (
    <div className="flex gap-3 justify-center mb-8">
      {Array.from({ length: total }).map((_, index) => {
        const isDone = step > index;
        const isActive = step === index;

        return (
          <div
            key={index}
            className={`
              w-4 h-4 rounded-full transition-all
              ${isDone ? "bg-green-600" : ""}
              ${isActive ? "bg-green-400 scale-125" : ""}
              ${!isDone && !isActive ? "bg-gray-300" : ""}
            `}
          />
        );
      })}
    </div>
  );
}
