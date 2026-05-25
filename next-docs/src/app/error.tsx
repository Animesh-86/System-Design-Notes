"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#060608] text-gray-200">
      <div className="max-w-md w-full bg-[#111115] border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Something went wrong!</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            An unexpected error occurred. This could be a temporary issue.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
