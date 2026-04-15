"use client";

import gsap from "gsap";

import {
  GraduationCap,
  MonitorPlay,
  ServerCog,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  location?: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  achievements?: string[];
  skills: string[];
}

const experiences: ExperienceData[] = [
  {
    id: "exp-1",
    title: "Computer Science",
    company: "Mansoura University",
    location: "Mansoura, Egypt",
    date: "2023 - Present",
    icon: <GraduationCap className="w-5 h-5" />,
    description:
      "Studying Computer Science with focus on software development and web technologies.",
    skills: [
      "Algorithms",
      "Data Structures",
      "Software Engineering",
      "Web Development",
      "Operating Systems",
      "Programming",
    ],
  },
  {
    id: "exp-2",
    title: "Freelance",
    company: "Frontend Developer",
    date: "2024 - Present",
    icon: <MonitorPlay className="w-5 h-5" />,
    description:
      "Successfully delivered 30+ real-world projects for clients worldwide. Leading development of web applications using modern technologies. Responsible for frontend architecture, performance optimization, and delivering high-quality solutions.",
    achievements: [
      "Completed 30+ real-world projects for clients globally",
      "Built full-stack e-commerce platforms with payment integration",
      "Developed responsive dashboards and admin panels",
      "Created mobile applications using React Native",
      "Implemented modern UI/UX with animations and micro-interactions",
    ],
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Shadcn UI",
      "React Native",
      "Node.js",
      "MongoDB",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    id: "exp-3",
    title: "Freelance",
    company: "MERN Stack Developer",
    date: "2025 - Present",
    icon: <ServerCog className="w-5 h-5" />,
    description:
      "Engineered scalable, high-performance web applications using the MERN stack. Designed robust backend architectures, RESTful APIs, and efficient database schemas to handle complex data flows and seamless client-server integration.",
    achievements: [
      "Architected and delivered 12+ full-stack MERN applications from scratch to deployment.",
      "Designed secure RESTful APIs with Node.js and Express, implementing JWT authentication.",
      "Optimized database schemas using MongoDB and Mongoose for rapid data retrieval.",
      "Integrated third-party services, WebSockets for real-time features, and comprehensive error handling.",
    ],
    skills: [
      "MERN Stack",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
      "Redux Toolkit",
      "JWT",
      "Mongoose",
      "WebSockets",
    ],
  },
];

export function Experience() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ── Heading reveal ── */
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".experience-heading-wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      headingTl
        .fromTo(
          ".experience-heading",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
        )
        .fromTo(
          ".experience-bar",
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: "power4.out" },
          "-=0.4",
        );

      /* ── Timeline items reveal ── */
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

      items.forEach((item, i) => {
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".timeline-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        ).fromTo(
          content,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2",
        );
      });

      /* ── Timeline line animation ── */
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      id="experience"
      ref={container}
      className="relative bg-background overflow-hidden py-24 md:py-32"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] -left-[10%] w-[400px] h-[400px] bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] -right-[5%] w-[350px] h-[350px] bg-accent/10 dark:bg-accent/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <div className="experience-heading-wrapper mb-16 md:mb-24">
          <h2 className="experience-heading opacity-0 text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Experience
            </span>
          </h2>
          <div className="experience-bar opacity-0 mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-accent/50" />
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative pl-4 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border md:translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-transparent w-full" />
          </div>

          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-10 md:pl-28"
              >
                {/* Timeline Dot */}
                <div className="timeline-dot opacity-0 absolute -left-3 md:left-4 top-0 md:translate-x-[-4px] w-9 h-9 md:w-11 md:h-11 rounded-full bg-background dark:bg-primary border-2 border-primary flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                  <div className="text-primary dark:text-foreground">
                    {exp.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div className="timeline-content opacity-0 group relative rounded-2xl border border-border bg-card/30 dark:bg-muted/50 backdrop-blur-sm p-6 md:p-8 hover:bg-card/50 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between xl:gap-8 gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-xl font-medium text-primary mb-3">
                        {exp.company}
                      </h4>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.date}</span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && (
                    <div className="mb-6">
                      <div className="space-y-2.5">
                        {exp.achievements.map((acc, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm md:text-base text-muted-foreground">
                              {acc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/10 dark:bg-primary/25 text-primary border-0 font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
