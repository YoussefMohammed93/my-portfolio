"use client";

import gsap from "gsap";
import React, { useRef, useEffect } from "react";

interface MagneticWrapperProps {
  children: React.ReactElement;
  className?: string;
}

export function MagneticWrapper({ children, className }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // We get the first child which is the actual React element inside
    const child = element.firstElementChild as HTMLElement;
    if (!child) return;

    const handleMouseLeave = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Reset scale on leave
      gsap.to(child, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
    };

    const handleMouseEnter = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Zoom slightly on hover
      gsap.to(child, { scale: 1.1, duration: 0.5, ease: "back.out(1.5)" });
    };

    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", position: "relative" }}
    >
      {children}
    </div>
  );
}
