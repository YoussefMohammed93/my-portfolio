"use client";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const CODE_LINES = [
  { text: "import", color: "text-purple-400" },
  { text: " express", color: "text-sky-300" },
  { text: " from ", color: "text-purple-400" },
  { text: "'express'", color: "text-amber-300" },
  { text: ";", color: "text-white/50" },
  { text: "\n", color: "" },
  { text: "import", color: "text-purple-400" },
  { text: " mongoose", color: "text-sky-300" },
  { text: " from ", color: "text-purple-400" },
  { text: "'mongoose'", color: "text-amber-300" },
  { text: ";", color: "text-white/50" },
  { text: "\n\n", color: "" },
  { text: "const ", color: "text-purple-400" },
  { text: "app", color: "text-sky-300" },
  { text: " = ", color: "text-white/50" },
  { text: "express", color: "text-emerald-400" },
  { text: "();", color: "text-white/50" },
  { text: "\n\n", color: "" },
  { text: "app", color: "text-sky-300" },
  { text: ".", color: "text-white/50" },
  { text: "get", color: "text-emerald-400" },
  { text: "(", color: "text-white/50" },
  { text: "'/api'", color: "text-amber-300" },
  { text: ", ", color: "text-white/50" },
  { text: "async ", color: "text-purple-400" },
  { text: "(req, res)", color: "text-orange-300" },
  { text: " => ", color: "text-purple-400" },
  { text: "{", color: "text-white/50" },
  { text: "\n", color: "" },
  { text: "  const ", color: "text-purple-400" },
  { text: "data", color: "text-sky-300" },
  { text: " = ", color: "text-white/50" },
  { text: "await ", color: "text-purple-400" },
  { text: "User", color: "text-emerald-400" },
  { text: ".", color: "text-white/50" },
  { text: "find", color: "text-emerald-400" },
  { text: "();", color: "text-white/50" },
  { text: "\n", color: "" },
  { text: "  res", color: "text-sky-300" },
  { text: ".", color: "text-white/50" },
  { text: "json", color: "text-emerald-400" },
  { text: "({ ", color: "text-white/50" },
  { text: "data", color: "text-sky-300" },
  { text: " });", color: "text-white/50" },
  { text: "\n", color: "" },
  { text: "});", color: "text-white/50" },
];

export function NodeSnapshot() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleTokens, setVisibleTokens] = useState(0);

  useGSAP(
    () => {
      // Fade the card in
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.2,
        },
      );

      // Typewriter: reveal tokens one by one
      const obj = { count: 0 };
      gsap.to(obj, {
        count: CODE_LINES.length,
        duration: 4,
        ease: "steps(" + CODE_LINES.length + ")",
        delay: 1.8,
        onUpdate: () => {
          setVisibleTokens(Math.round(obj.count));
        },
      });
    },
    { scope: ref },
  );

  // Build the displayed code from visible tokens
  const rendered = CODE_LINES.slice(0, visibleTokens);

  return (
    <div
      ref={ref}
      className="opacity-0 absolute -bottom-8 -right-12 lg:-right-4 xl:right-8 hidden lg:flex items-end justify-end pointer-events-none z-0"
      style={{ transform: "rotate(3deg)" }}
    >
      <div className="w-[380px] rounded-xl border border-white/[0.08] bg-[#1e1e2e] shadow-2xl shadow-black/20 overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[#181825]">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-white/40 font-mono">
            server.ts
          </span>
        </div>

        {/* Code Body */}
        <div className="px-4 py-4 font-mono text-xs leading-6 min-h-[180px]">
          <pre className="whitespace-pre-wrap">
            {rendered.map((token, i) => (
              <span key={i} className={token.color}>
                {token.text}
              </span>
            ))}
            <span className="inline-block w-[2px] h-4 bg-purple-400/70 animate-pulse align-text-bottom ml-px" />
          </pre>
        </div>
      </div>
    </div>
  );
}
