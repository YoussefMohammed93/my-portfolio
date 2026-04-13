"use client";

import gsap from "gsap";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { SplitText } from "gsap/SplitText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, ArrowDown } from "lucide-react";
import { NodeSnapshot } from "@/components/node-snapshot";
import { ReactSnapshot } from "@/components/react-snapshot";

gsap.registerPlugin(useGSAP, SplitText);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const scrollToAbout = () => {
    lenis?.scrollTo("#about");
  };

  useGSAP(
    () => {
      // Split the heading into characters with a clip-mask for reveal
      const split = SplitText.create(".hero-heading", {
        type: "chars",
        mask: "chars",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate non-heading hero elements staggered
      tl.to(".hero-element", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
      });

      // Reveal the heading container, then cascade characters from behind their masks
      tl.set(".hero-heading", { autoAlpha: 1 }, 0.35).from(
        split.chars,
        {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
        },
        0.35,
      );

      // Animate glow fade in
      gsap.to(".hero-glow", {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-20 pb-16 overflow-hidden"
    >
      {/* Light glow animation under the Navbar */}
      <div
        className="hero-glow opacity-0 scale-90 absolute top-[-5%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-primary/30 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: "2.5s" }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none -z-20" />

      {/* Glassmorphic Code Snapshots — behind text, above grid */}
      <ReactSnapshot />
      <NodeSnapshot />

      <section className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center -mt-16">
        {/* Availability Badge */}
        <div className="hero-element opacity-0 translate-y-8">
          <Badge variant="secondary" className="mb-8 p-3.5! font-medium">
            <span className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Available for work</span>
            </span>
          </Badge>
        </div>

        {/* Name / Heading */}
        <h1 className="hero-heading invisible font-montserrat text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
          Youssef Mohammed
        </h1>

        {/* Subtitle */}
        <h2 className="hero-element opacity-0 translate-y-8 text-xl md:text-3xl text-muted-foreground font-heading mb-8 max-w-2xl mx-auto">
          Full-Stack MERN Developer
        </h2>

        {/* Short Bio */}
        <p className="hero-element opacity-0 translate-y-8 max-w-2xl mx-auto text-base md:text-xl text-muted-foreground leading-relaxed mb-12">
          I build modern, scalable web applications — from pixel-perfect
          frontends to robust backends. 3+ years of experience, 35+ projects
          delivered.
        </p>

        {/* CTA Buttons */}
        <div className="hero-element opacity-0 translate-y-8 flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 rounded-full font-medium cursor-pointer"
            onClick={() => lenis?.scrollTo("#projects")}
          >
            <span className="flex items-center gap-2 px-5">
              <span className="text-base">View Projects</span>
              <Eye className="size-5" />
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 rounded-full font-medium cursor-pointer"
            onClick={() => lenis?.scrollTo("#contact")}
          >
            <span className="flex items-center gap-2 px-5">
              <span className="text-base">Contact Me</span>
              <Mail className="size-5" />
            </span>
          </Button>
        </div>

        {/* Scroll Down Arrow */}
        <div className="hero-element opacity-0 translate-y-8">
          <button
            onClick={scrollToAbout}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-border/40 bg-secondary/50 dark:bg-card backdrop-blur-sm hover:bg-card/90 dark:hover:bg-secondary/90 transition-all animate-bounce cursor-pointer focus:outline-none"
            aria-label="Scroll to About section"
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </section>
    </div>
  );
}
