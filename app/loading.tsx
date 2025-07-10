"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <svg
          className="animate-spin h-16 w-16 text-primary drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <div className="text-2xl font-semibold text-primary drop-shadow-sm tracking-wide">
          Loading{Array(dots).fill(".").join("")}
        </div>
        <div className="text-muted-foreground text-sm mt-2">
          Please wait while we prepare your experience
        </div>
      </div>
    </div>
  );
}
