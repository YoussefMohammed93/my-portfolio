"use client";

import gsap from "gsap";
import Image from "next/image";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, FolderGit2, Users } from "lucide-react";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  {
    label: "Years Experience",
    value: "3+",
    icon: Code2,
  },
  {
    label: "Projects Delivered",
    value: "45+",
    icon: FolderGit2,
  },
  {
    label: "Clients Worldwide",
    value: "17+",
    icon: Users,
  },
];

export function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

          if (!reduceMotion) {
            // Background Blooms Animation — Only for no-preference
            gsap.to(".about-blob", {
              x: "random(-50, 50)",
              y: "random(-50, 50)",
              rotation: "random(-20, 20)",
              duration: "random(12, 18)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: {
                each: 2.5,
                from: "random",
              },
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
            defaults: { ease: "power3.out" },
          });

          // Standard reveal but with reduced motion checks
          tl.fromTo(
            ".about-heading",
            { y: reduceMotion ? 0 : 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
          )
            .fromTo(
              ".about-line",
              { scaleX: 0, opacity: 0, transformOrigin: "left center" },
              { scaleX: 1, opacity: 1, duration: 0.8, ease: "power4.out" },
              "-=0.4",
            )
            .fromTo(
              ".about-image-wrapper",
              { x: reduceMotion ? 0 : 80, opacity: 0, scale: reduceMotion ? 1 : 0.95 },
              { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
              "-=0.6",
            )
            .fromTo(
              ".about-text-content",
              { y: reduceMotion ? 0 : 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: reduceMotion ? 0.05 : 0.15 },
              "-=1.0",
            )
            .fromTo(
              ".about-stat-card",
              { y: reduceMotion ? 0 : 30, opacity: 0, scale: reduceMotion ? 1 : 0.9 },
              { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: reduceMotion ? 0.05 : 0.15 },
              "-=0.4",
            );
        },
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
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="about-blob absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="about-blob absolute top-[60%] right-[5%] w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full" />
        <div className="about-blob absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-secondary/15 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Content Section */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-none justify-center">
            {/* Header */}
            <div className="mb-8 md:mb-10">
              <h2 className="about-heading opacity-0 text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Me
                </span>
              </h2>
              <div className="about-line opacity-0 mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-accent/50" />
            </div>

            {/* Bio Text */}
            <div className="space-y-6 mb-12">
              <p className="about-text-content opacity-0 text-base md:text-lg text-muted-foreground leading-relaxed">
                I&apos;m Youssef Mohammed, a{" "}
                <span className="text-foreground font-semibold">
                  Full-Stack MERN Developer
                </span>{" "}
                and Computer Science student. Relentlessly pursuing
                pixel-perfect UIs and robust backend architectures, I transform
                ideas into seamless digital experiences.
              </p>
              <p className="about-text-content opacity-0 text-base md:text-lg text-muted-foreground leading-relaxed">
                Specializing in{" "}
                <span className="text-foreground font-medium px-2 py-0.5 rounded-md bg-primary/10 dark:bg-primary/40">
                  React.js
                </span>
                ,{" "}
                <span className="text-foreground font-medium px-2 py-0.5 rounded-md bg-primary/10 dark:bg-primary/40">
                  Next.js
                </span>
                , and{" "}
                <span className="text-foreground font-medium px-2 py-0.5 rounded-md bg-primary/10 dark:bg-primary/40">
                  Node.js
                </span>
                , I write code that doesn&apos;t just work, but scales and
                performs beautifully.
              </p>
              <p className="about-text-content opacity-0 text-base md:text-lg text-muted-foreground leading-relaxed">
                Whether I&apos;m mentoring developers or delivering global
                freelance projects, my commitment to clean architecture remains
                the same. Let&apos;s build something extraordinary.
              </p>
            </div>

            {/* Stat Cards - Grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
              {stats.map((stat, i) => (
                <MagneticWrapper key={i}>
                  <div
                    className="about-stat-card opacity-0 group relative overflow-hidden p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors duration-300 h-full"
                    data-cursor="hover"
                  >
                    <div className="absolute top-5 right-5 sm:right-1 sm:top-1 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                      <stat.icon className="w-16 h-16 text-foreground" />
                    </div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 text-primary">
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-3xl font-bold text-foreground font-heading">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </MagneticWrapper>
              ))}
            </div>
          </div>

          {/* Right — Image Section */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            <div
              className="about-image-wrapper opacity-0 relative group"
              data-cursor="hover"
            >
              {/* Main Image Container */}
              <div className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] lg:w-[27rem] lg:h-[38rem] rounded-[2rem] overflow-hidden border border-border bg-muted/20 backdrop-blur-sm p-4">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <Image
                    src="/me.jpg"
                    alt="Youssef Mohammed"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 288px, 384px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
