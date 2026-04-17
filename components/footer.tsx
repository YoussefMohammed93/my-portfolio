"use client";

import gsap from "gsap";
import Link from "next/link";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { FiMail } from "react-icons/fi";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/YoussefMohammed93",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/youssef-mohammed-6893a031b/",
  },
  {
    name: "Whatsapp",
    icon: FaWhatsapp,
    href: "https://wa.me/+201062658632",
  },
  {
    name: "Email",
    icon: FiMail,
    href: "mailto:youssefmohammed2093@gmail.com",
  },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom bottom",
        },
      });

      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          gsap.utils.toArray(linksRef.current?.children || []),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .fromTo(
          bottomRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <footer
      ref={containerRef}
      className="relative z-10 bg-secondary dark:bg-muted/50 border-t border-border/40 pt-16 pb-8 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0 mb-16">
          <div className="max-w-md">
            <h2
              ref={textRef}
              className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight"
            >
              Let&apos;s work <span className="text-primary">together.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Feel free to reach out if you&apos;re looking for a developer,
              have a question, or just want to connect.
            </p>
          </div>

          <div
            ref={linksRef}
            className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center hover:text-primary transition-colors duration-200 size-14 rounded-2xl bg-background dark:bg-secondary border border-border text-muted-foreground"
              >
                <link.icon className="size-5 md:size-6 mb-1" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/40 text-sm text-muted-foreground/80"
        >
          <p>
            &copy; {new Date().getFullYear()} Youssef Mohammed. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Designed & Built with{" "}
            <span className="text-primary font-medium tracking-wider">
              GSAP
            </span>{" "}
            &amp;{" "}
            <span className="text-primary font-medium tracking-wider">
              Next.js
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
