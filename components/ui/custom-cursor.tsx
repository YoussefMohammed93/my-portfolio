"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize GSAP properties if the device has a mouse/fine pointer
    // AND the user doesn't prefer reduced motion
    if (
      typeof window === "undefined" ||
      !window.matchMedia ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
    const xDotTo = gsap.quickTo(cursorDot, "x", {
      duration: 0.05,
      ease: "power3",
    });
    const yDotTo = gsap.quickTo(cursorDot, "y", {
      duration: 0.05,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isNavLogo = target.closest('[data-cursor="logo"]');
      const isNavLink = target.closest('[data-cursor="link"]');
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [data-cursor="hover"]',
      );

      if (isNavLogo) {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: "var(--primary)",
          borderColor: "transparent",
          opacity: 0.1,
          duration: 0.4,
          ease: "back.out(1.5)",
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
      } else if (isNavLink) {
        gsap.to(cursor, {
          scale: 2,
          backgroundColor: "var(--primary)",
          borderColor: "transparent",
          opacity: 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
      } else if (isInteractive) {
        gsap.to(cursor, {
          scale: 1.5,
          opacity: 0.5,
          borderColor: "var(--primary)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
        gsap.to(cursorDot, { scale: 0.5, duration: 0.3 });
      } else {
        // Reset to default
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "var(--primary)",
          opacity: 0.5,
          duration: 0.3,
        });
        gsap.to(cursorDot, { scale: 1, duration: 0.3 });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
      gsap.to(cursorDot, { scale: 0.5, duration: 0.1 });
    };

    const handleMouseUp = () => {
      // Re-trigger hover effect if still hovering
      const isInteractive = document.querySelector(":hover");
      if (isInteractive) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
      gsap.to(cursorDot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border-[1.5px] border-primary opacity-50 rounded-full pointer-events-none z-[9999]"
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999]"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          * {
            cursor: none !important;
          }
        }
        @media (pointer: coarse), (hover: none), (prefers-reduced-motion: reduce) {
          .custom-cursor, .custom-cursor-dot {
            display: none !important;
          }
        }
      `,
        }}
      />
    </>
  );
}
