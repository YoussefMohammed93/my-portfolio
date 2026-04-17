"use client";

import gsap from "gsap";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/components/loading-context";

gsap.registerPlugin(useGSAP);

export function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const { isLoaded, setIsLoaded, progress, setProgress } = useLoading();
  const [internalProgress, setInternalProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const counterRef = useRef<HTMLSpanElement>(null);

  // ── Asset Tracking ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    const images = Array.from(document.images);
    const totalImages = images.length;
    let loadedImages = 0;

    const updateProgress = () => {
      loadedImages++;
      // We reserve 80% for images, 20% for final processing/fonts
      const calculatedProgress = (loadedImages / totalImages) * 80;
      setProgress(calculatedProgress);
    };

    if (totalImages === 0) {
      setProgress(80);
    } else {
      images.forEach((img) => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener("load", updateProgress);
          img.addEventListener("error", updateProgress);
        }
      });
    }

    // Font tracking
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setProgress(100);
      });
    } else {
      setProgress(100);
    }

    // Fallback: Force loaded after 5 seconds
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [setProgress]);

  // ── GSAP Progress Interpolation ──
  useGSAP(
    () => {
      // Smoothly animate the internal progress to match the actual progress
      gsap.to(
        { val: internalProgress },
        {
          val: progress,
          duration: 1,
          ease: "power2.out",
          onUpdate: function () {
            const currentVal = Math.round(this.targets()[0].val);
            setInternalProgress(currentVal);
            if (counterRef.current) {
              counterRef.current.textContent = `${currentVal}%`;
            }
          },
        },
      );

      // When 100% is reached, trigger exit
      if (progress >= 100 && !isLoaded) {
        const mm = gsap.matchMedia();
        mm.add(
          {
            reduceMotion: "(prefers-reduced-motion: reduce)",
            noPreference: "(prefers-reduced-motion: no-preference)",
          },
          (context) => {
            const { reduceMotion } = context.conditions as {
              reduceMotion: boolean;
            };

            const tl = gsap.timeline({
              onComplete: () => setIsVisible(false),
            });

            if (reduceMotion) {
              // Simple fade out for reduced motion
              tl.to(container.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onStart: () => setIsLoaded(true),
              });
            } else {
              // Standard dramatic exit
              tl.to(".preloader-logo", {
                scale: 1.1,
                opacity: 0,
                duration: 0.8,
                ease: "expo.in",
                delay: 0.5,
              })
                .to(
                  ".preloader-counter",
                  {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    ease: "expo.out",
                  },
                  "-=0.4",
                )
                .add(() => {
                  setIsLoaded(true);
                })
                .to(container.current, {
                  yPercent: -100,
                  duration: 1.2,
                  ease: "expo.inOut",
                });
            }
          },
        );
      }
    },
    { scope: container, dependencies: [progress] },
  );

  if (!isVisible) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background pointer-events-auto"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo/Avatar Animation */}
        <div className="preloader-logo mb-12 relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Avatar Container - Expanded to fill the gap */}
          <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Circular progress track */}
          <svg className="absolute inset-0 -rotate-90 w-full h-full p-1">
            <defs>
              <linearGradient
                id="progress-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/10"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: "1400", // Using a large enough buffer for safety
                strokeDashoffset: 1400 - (1400 * internalProgress) / 100,
                transition:
                  "stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            />
          </svg>
        </div>

        {/* Counter */}
        <div className="preloader-counter mb-6 overflow-hidden">
          <span
            ref={counterRef}
            className="text-4xl md:text-6xl font-bold font-heading tracking-tighter"
          >
            0%
          </span>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
      </div>
    </div>
  );
}
