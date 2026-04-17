"use client";

import gsap from "gsap";
import React, { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/loading-context";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isLoaded } = useLoading();
  const lenis = useLenis();
  const buttonRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // Visibility threshold: 400px
      setIsVisible(scrolled > 400);

      // Progress calculation
      if (totalScroll > 0) {
        setProgress(scrolled / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded]);

  useGSAP(
    () => {
      if (isVisible) {
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        });
      }
    },
    { scope: buttonRef, dependencies: [isVisible] },
  );

  const scrollToTop = () => {
    lenis?.scrollTo(0, { lerp: 0.1 });
  };

  if (!isLoaded) return null;

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-8 right-4 sm:right-8 z-[100] opacity-0 scale-75 pointer-events-auto"
    >
      <div className="relative group p-[2px] rounded-full">
        {/* Progress Circle SVG */}
        <svg
          className="absolute inset-0 -rotate-90 pointer-events-none"
          width="56"
          height="56"
          viewBox="0 0 56 56"
        >
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            className="text-border/10"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary transition-all duration-300"
          />
        </svg>

        <Tooltip>
          <TooltipTrigger
            delay={1}
            render={
              <Button
                onClick={scrollToTop}
                size="icon"
                className="relative size-14 rounded-full bg-primary text-white! backdrop-blur-xl border border-border/20 transition-all duration-300 shadow-2xl overflow-hidden group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="size-6 transition-transform group-hover:-translate-y-1" />
              </Button>
            }
          />
          <TooltipContent
            side="top"
            sideOffset={12}
            className="bg-muted/90 backdrop-blur-sm border-border/20 text-foreground font-medium"
          >
            <p>Scroll to top page</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
