"use client";

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Entrance sequence
      tl.from(".nf-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      }).from(
        ".nf-bg-text",
        {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
        },
        "-=1",
      );

      // Floating animation for the image
      gsap.to(".nf-image", {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Floating animation for decorative blobs
      gsap.to(".nf-blob", {
        x: 30,
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-background p-4 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="nf-blob absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
        <div className="nf-blob absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

        {/* Large 404 Text Background */}
        <div className="nf-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-primary/[0.03] select-none">
          404
        </div>
      </div>

      <div className="relative z-10 nf-content flex flex-col items-center text-center max-w-2xl px-6">
        <div className="nf-image relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Image
            src="/404.png"
            alt="Not Found"
            width={300}
            height={300}
            className="relative z-10 w-64 md:w-80 h-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">
          Lost in the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Void
          </span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
          The page you&apos;re looking for has drifted off into the digital
          abyss. Let&apos;s get you back to familiar territory.
        </p>

        <div>
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 gap-2 group h-12",
            )}
          >
            <Home className="size-4" />
            Back to Reality
          </Link>
        </div>
      </div>
    </div>
  );
}
