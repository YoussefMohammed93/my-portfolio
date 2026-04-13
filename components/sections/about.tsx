"use client";

import gsap from "gsap";
import Image from "next/image";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating blobs animations
      gsap.to(".about-blob", {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        rotation: "random(-15, 15)",
        duration: "random(10, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });
      // ... remainder of the timeline logic stays the same
      tl.to(".about-heading", {
        y: 0,
        opacity: 1,
        duration: 0.8,
      })
        .to(
          ".about-text",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.4",
        )
        .to(
          ".about-image",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.4",
        );
    },
    { scope: container },
  );

  return (
    <section
      id="about"
      ref={container}
      className="relative py-24 md:py-32 px-4 bg-background overflow-hidden"
    >
      {/* Background Elements — Glass Blobs & Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] brightness-100 contrast-125 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Blobs */}
        <div className="about-blob absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />
        <div className="about-blob absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="about-blob absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-accent/15 blur-[90px] rounded-full" />

        {/* Grid pattern overlay (subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-16 md:mb-20">
          <h2 className="about-heading opacity-0 translate-y-8 text-3xl md:text-5xl font-bold font-heading text-foreground">
            About Me
          </h2>
          <div className="about-heading opacity-0 translate-y-8 mt-3 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Text Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-5">
              <p className="about-text opacity-0 translate-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                I&apos;m Youssef Mohammed — a{" "}
                <span className="text-foreground font-medium">
                  Full-Stack MERN Developer
                </span>{" "}
                and Computer Science student at{" "}
                <span className="text-foreground font-medium">
                  Mansoura University
                </span>
                . Over the past 3+ years, I&apos;ve been deeply immersed in
                building modern, high-performance web applications — from
                pixel-perfect frontends to scalable backend architectures.
              </p>
              <p className="about-text opacity-0 translate-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                I&apos;m passionate about{" "}
                <span className="text-foreground font-medium">
                  clean architecture
                </span>
                , thoughtful UI/UX, and writing code that is both maintainable
                and performant. My tech stack revolves around{" "}
                <span className="text-foreground font-medium">
                  React, Next.js, Node.js, Express, and MongoDB
                </span>
                , with a constant drive to explore new tools and frameworks.
              </p>
              <p className="about-text opacity-0 translate-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                Since starting freelancing in{" "}
                <span className="text-foreground font-medium">2023</span>,
                I&apos;ve successfully delivered{" "}
                <span className="text-foreground font-medium">
                  35+ projects
                </span>{" "}
                for clients worldwide, mentored aspiring developers, and led the
                frontend team at{" "}
                <span className="text-foreground font-medium">
                  IEEE Mansoura
                </span>
                . I thrive on turning complex problems into elegant, intuitive
                digital experiences.
              </p>
            </div>
          </div>

          {/* RIGHT — Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="about-image opacity-0 translate-y-10 scale-95 relative">
              <div className="relative w-64 h-72 sm:w-72 sm:h-72 lg:w-96 lg:h-[27rem] rounded-2xl overflow-hidden dark:border border-border">
                <Image
                  src="/me.jpg"
                  alt="Youssef Mohammed — Full-Stack MERN Developer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, 288px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
