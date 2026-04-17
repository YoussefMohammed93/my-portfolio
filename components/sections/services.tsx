"use client";

import gsap from "gsap";

import {
  Layout,
  Layers,
  Database,
  Palette,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Landing Pages",
    description:
      "Crafting high-speed, SEO-optimized single-page applications that convert visitors into customers.",
    icon: Layout,
  },
  {
    title: "Fullstack Dashboards",
    description:
      "Building robust admin panels and SaaS platforms with real-time data and secure authentication.",
    icon: LayoutDashboard,
  },
  {
    title: "UI/UX to React Conversion",
    description:
      "Precision engineering of complex prototypes into scalable, pixel-perfect React components.",
    icon: Layers,
  },
  {
    title: "Database Design",
    description:
      "Architecting high-performance SQL and NoSQL data models for speed, security, and scalability.",
    icon: Database,
  },
  {
    title: "Figma to Code",
    description:
      "Transforming static designs into living, interactive code with absolute fidelity to your brand vision.",
    icon: Palette,
  },
  {
    title: "Web Animations",
    description:
      "Bringing websites to life with complex, high-performance animations and immersive 3D experiences using GSAP & Three.js.",
    icon: Sparkles,
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance animation for the title
      gsap.from(".services-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 85%",
        },
      });

      // Staggered entrance for cards
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-background/50"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-start mb-16">
          <h2 className="services-title text-3xl md:text-5xl font-bold font-heading mb-4">
            Services{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent italic">
              Expertise
            </span>
          </h2>
          <div className="services-title w-20 h-1.5 bg-gradient-to-r from-primary to-accent/50 rounded-full" />
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 rounded-2xl border border-border/50 bg-secondary/50 dark:bg-muted/50 backdrop-blur-xl transition-colors duration-300 hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="mb-6 inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <service.icon className="size-7" />
              </div>

              <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}
