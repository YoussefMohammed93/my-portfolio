"use client";

import gsap from "gsap";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Skill Data ─── */
interface Skill {
  name: string;
  icon: string;
  invertDark?: boolean;
}

const row1: Skill[] = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invertDark: true,
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    invertDark: true,
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Prisma",
    icon: "https://cdn.simpleicons.org/prisma/2D3748",
  },
];

const row2: Skill[] = [
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Shadcn UI",
    icon: "https://cdn.simpleicons.org/shadcnui",
    invertDark: true,
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Redux Toolkit",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "React Query",
    icon: "https://cdn.simpleicons.org/reactquery/FF4154",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github",
    invertDark: true,
  },
  {
    name: "npm",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  {
    name: "pnpm",
    icon: "https://cdn.simpleicons.org/pnpm/F69220",
  },
];

const row3: Skill[] = [
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Postman",
    icon: "https://cdn.simpleicons.org/postman/FF6C37",
  },
  {
    name: "Vite",
    icon: "https://cdn.simpleicons.org/vite/646CFF",
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel",
    invertDark: true,
  },
  {
    name: "Framer Motion",
    icon: "https://cdn.simpleicons.org/framer",
    invertDark: true,
  },
  {
    name: "GSAP",
    icon: "https://cdn.simpleicons.org/greensock/88CE02",
  },
  {
    name: "Three.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    invertDark: true,
  },
  {
    name: "Lenis",
    icon: "https://unpkg.com/lucide-static@0.321.0/icons/navigation.svg",
    invertDark: true,
  },
];

/* ─── Skill Card ─── */
function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3 select-none"
      data-cursor="hover"
    >
      <img
        src={skill.icon}
        alt={skill.name}
        width={28}
        height={28}
        loading="lazy"
        className={`w-7 h-7 object-contain ${skill.invertDark ? "dark:invert" : ""}`}
      />
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({
  skills,
  className,
}: {
  skills: Skill[];
  className?: string;
}) {
  return (
    <div className={`marquee-row overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track flex gap-4 w-max">
        {/* Original items */}
        {skills.map((skill) => (
          <SkillCard key={`a-${skill.name}`} skill={skill} />
        ))}
        {/* Duplicate for seamless loop */}
        {skills.map((skill) => (
          <SkillCard key={`b-${skill.name}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function Skills() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── Heading reveal ── */
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      headingTl
        .to(".skills-heading", {
          y: 0,
          opacity: 1,
          duration: 0.8,
        })
        .to(
          ".skills-bar",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4",
        );

      /* ── Marquee rows fade in ── */
      gsap.to(".marquee-row", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      /* ── GSAP-powered infinite marquee scrolls ── */
      const tracks = container.current?.querySelectorAll(".marquee-track");
      if (!tracks) return;

      tracks.forEach((track, i) => {
        const el = track as HTMLElement;
        // Get the width of the first half (original items)
        const halfWidth = el.scrollWidth / 2;

        // Different durations for depth effect: Row 2 is slower
        const durations = [30, 45, 30];

        gsap.fromTo(
          el,
          { x: 0 },
          {
            x: -halfWidth,
            duration: durations[i],
            ease: "none",
            repeat: -1,
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      id="skills"
      ref={container}
      className="relative py-12 md:py-16 px-4 bg-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Blobs */}
        <div className="skills-blob absolute top-[15%] right-[10%] w-[350px] h-[350px] bg-primary/15 dark:bg-primary/40 blur-[120px] rounded-full" />
        <div className="skills-blob absolute bottom-[15%] left-[5%] w-[300px] h-[300px] bg-primary/10 dark:bg-primary/25 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="skills-heading opacity-0 translate-y-8 text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Skills
            </span>
          </h2>
          <div className="skills-bar opacity-0 translate-y-8 mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-accent/50" />
        </div>
      </div>

      {/* Marquee Rows - Full Width */}
      <div className="relative z-10 w-full space-y-6">
        <MarqueeRow skills={row1} className="opacity-0 translate-y-6" />
        <MarqueeRow skills={row2} className="opacity-0 translate-y-6" />
        <MarqueeRow skills={row3} className="opacity-0 translate-y-6" />
      </div>
    </section>
  );
}
