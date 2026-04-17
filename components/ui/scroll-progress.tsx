"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/components/loading-context";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { isLoaded } = useLoading();

  useEffect(() => {
    if (!isLoaded) return;

    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(4)) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    // Initial check
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full h-[3px] pointer-events-none origin-left">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
