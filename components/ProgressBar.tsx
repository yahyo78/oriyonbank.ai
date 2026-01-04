"use client";

export default function ProgressBar({ step, total }) {
  const percent = ((step + 1) / total) * 100;

  return (
    <div className="w-screen fixed top-0 left-0 right-0 z-50">
      <div className="h-2 bg-gray-200 w-full">
        <div
          className="h-full bg-green-600 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
