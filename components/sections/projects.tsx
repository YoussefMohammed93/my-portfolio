"use client";

import gsap from "gsap";
import Image from "next/image";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Sparkles } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Project Data ─── */
interface Project {
  name: string;
  tags: string[];
  stack: string[];
  description: string;
  github: string;
  demo: string;
  image: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    name: "V-Quiz",
    tags: ["Fullstack", "AI", "EdTech"],
    stack: [
      "Next.js",
      "TypeScript",
      "Convex",
      "Clerk",
      "Gemini AI",
      "Tailwind CSS",
    ],
    description:
      "AI-powered learning platform that transforms any topic into chat-native quizzes, flashcards, and study sessions instantly using Google Gemini.",
    github: "https://github.com/YoussefMohammed93/V-QUIZ",
    demo: "https://v-quiz-demo.vercel.app",
    image: "/v-quiz.png",
    featured: true,
  },
  {
    name: "Linkup",
    tags: ["Fullstack", "Social Media"],
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    description:
      "Social media platform with user authentication, post creation, real-time updates, and fully responsive design.",
    github: "https://github.com/YoussefMohammed93/Linkup",
    demo: "https://linkup-pi.vercel.app",
    image: "/linkup.png",
  },
  {
    name: "Taskmate",
    tags: ["Fullstack", "Productivity"],
    stack: ["React.js", "Next.js", "TypeScript"],
    description:
      "Comprehensive task management app featuring CRUD operations, real-time updates, and user authentication. Optimized for productivity across all devices.",
    github: "https://github.com/YoussefMohammed93/Taskmate",
    demo: "https://taskmate-delta.vercel.app",
    image: "/taskmate.png",
  },
  {
    name: "Frontend Hub",
    tags: ["Frontend", "Education"],
    stack: ["React.js", "Next.js", "TypeScript", "Convex"],
    description:
      "Developer learning platform with organized technical content and accessibility-focused design for developers of all skill levels.",
    github: "https://github.com/YoussefMohammed93/Frontend-Hub",
    demo: "https://frontend-hub-xi.vercel.app",
    image: "/frontendhub.png",
  },
  {
    name: "Notion Clone",
    tags: ["Fullstack", "Productivity"],
    stack: ["Next.js", "TypeScript", "Convex", "Tailwind CSS"],
    description:
      "Notion clone application allowing users to create, edit, and delete notes, notebooks, and tags. Features real-time updates, user authentication, and responsive design.",
    github: "https://github.com/YoussefMohammed93/Notion-Clone",
    demo: "https://notion-clone-matrix.vercel.app",
    image: "/notion.png",
  },
];

/* ─── Main Section ─── */
export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      /* ── Heading reveal ── */
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-heading-wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      headingTl
        .fromTo(
          ".projects-heading",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
        )
        .fromTo(
          ".projects-bar",
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          ".projects-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );

      /* ── Responsive: Desktop vs Mobile ── */
      const mm = gsap.matchMedia();

      /* ━━ Desktop: Horizontal scroll showcase ━━ */
      mm.add("(min-width: 1024px)", () => {
        const track = container.current?.querySelector(
          ".projects-track",
        ) as HTMLElement;
        const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
        if (!track || slides.length === 0) return;

        // First slide: reveal when pin wrapper enters viewport
        gsap.fromTo(
          slides[0].querySelectorAll(".slide-image, .slide-content"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-pin-wrapper",
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );

        // Controls reveal
        gsap.fromTo(
          ".projects-controls",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-pin-wrapper",
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );

        // Horizontal scroll tween — ease: "none" is CRITICAL per GSAP best practices
        const scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin-wrapper",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update progress bar width
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`;
              }
              // Update slide counter
              if (counterRef.current) {
                const idx = Math.min(
                  slides.length - 1,
                  Math.round(self.progress * (slides.length - 1)),
                );
                counterRef.current.textContent = String(idx + 1).padStart(
                  2,
                  "0",
                );
              }
            },
          },
        });

        // Per-slide content reveals for slides 2+ using containerAnimation
        slides.slice(1).forEach((slide) => {
          const image = slide.querySelector(".slide-image");
          const content = slide.querySelector(".slide-content");

          if (image) {
            gsap.fromTo(
              image,
              { opacity: 0, x: -40, scale: 0.95 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left 80%",
                  toggleActions: "play none none none",
                },
              },
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                  toggleActions: "play none none none",
                },
              },
            );
          }
        });
      });

      /* ━━ Mobile: Vertical staggered reveal ━━ */
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.batch(".project-card-mobile", {
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
            );
          },
          start: "top 85%",
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      id="projects"
      ref={container}
      className="relative bg-background overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-primary/15 dark:bg-primary/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-primary/10 dark:bg-primary/20 blur-[100px] rounded-full" />
      </div>

      {/* Section heading */}
      <div className="projects-heading-wrapper relative z-10 pt-24 md:pt-32 pb-8 md:pb-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="projects-heading opacity-0 text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Projects
          </span>
        </h2>
        <div className="projects-bar opacity-0 mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-accent/50" />
        <p className="projects-subtitle opacity-0 mt-6 text-lg text-muted-foreground max-w-xl">
          A selection of projects that showcase my expertise in building modern,
          scalable web applications.
        </p>
      </div>

      {/* ═══ Desktop: Horizontal Scroll Showcase ═══ */}
      <div className="projects-pin-wrapper hidden lg:block relative z-10 h-screen">
        {/* Bottom controls: slide counter + progress bar */}
        <div className="projects-controls opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
          <span className="text-sm font-heading text-muted-foreground select-none">
            <span ref={counterRef} className="text-foreground font-bold">
              01
            </span>
            <span className="mx-2 text-border">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </span>
          <div className="w-48 h-[2px] bg-border rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-0 bg-gradient-to-r from-primary to-primary/50 rounded-full"
              style={{ transition: "none" }}
            />
          </div>
        </div>

        {/* Horizontal track */}
        <div className="projects-track flex will-change-transform">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="project-slide flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 lg:px-16 xl:px-24"
            >
              <div className="grid grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto w-full items-center">
                {/* Image */}
                <div
                  className="slide-image opacity-0 relative group"
                  data-cursor="hover"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-muted/20 backdrop-blur-sm shadow-2xl shadow-primary/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="50vw"
                    />
                  </div>
                  {/* Project counter badge */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center z-20 shadow-lg">
                    <span className="text-xs font-bold text-muted-foreground font-heading">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="slide-content opacity-0 flex flex-col justify-center">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.featured && (
                      <Badge className="bg-primary text-primary-foreground gap-1.5 animate-pulse">
                        <Sparkles className="size-3" />
                        Featured
                      </Badge>
                    )}
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 dark:bg-primary/25 text-primary border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Project name */}
                  <h3 className="text-3xl xl:text-4xl font-bold font-heading text-foreground mb-4 tracking-tight">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="rounded-full font-medium cursor-pointer"
                        data-cursor="hover"
                      >
                        <span className="flex items-center gap-2 px-3">
                          <span>Live Demo</span>
                          <ExternalLink className="size-4" />
                        </span>
                      </Button>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="rounded-full font-medium cursor-pointer"
                        data-cursor="hover"
                      >
                        <span className="flex items-center gap-2 px-3">
                          <span>Source Code</span>
                          <FaGithub className="size-4" />
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Mobile: Vertical Card Layout ═══ */}
      <div className="lg:hidden relative z-10 px-4 sm:px-8 pb-24 space-y-6 max-w-2xl mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className="project-card-mobile opacity-0 group relative rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden"
            data-cursor="hover"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              {project.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-primary text-primary-foreground gap-1.5">
                    <Sparkles className="size-3" />
                    Featured
                  </Badge>
                </div>
              )}
              <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground font-heading">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 dark:bg-primary/25 text-primary border-0 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-xl font-bold font-heading text-foreground mb-2">
                {project.name}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    className="w-full rounded-full font-medium cursor-pointer text-sm"
                    size="sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>Live Demo</span>
                      <ExternalLink className="size-3.5" />
                    </span>
                  </Button>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-full font-medium cursor-pointer text-sm"
                    size="sm"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>Source Code</span>
                      <FaGithub className="size-3.5" />
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
