"use client";

import gsap from "gsap";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Textarea } from "@/components/ui/textarea";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [state, handleSubmit] = useForm("xjgjgodg");

  useGSAP(
    () => {
      /* ── Background Blobs Floating ── */
      gsap.to(".contact-blob", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        scale: "random(0.9, 1.1)",
        duration: "random(4, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          /* ── ScrollReveal Sequence ── */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          });

          tl.set(".contact-content-wrapper", { visibility: "visible" })
            .fromTo(
              ".contact-heading",
              { y: 50, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8 },
            )
            .fromTo(
              ".contact-bar",
              { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" },
              { scaleX: 1, autoAlpha: 1, duration: 0.8, ease: "power4.out" },
              "-=0.4",
            )
            .fromTo(
              ".contact-text",
              { y: 20, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              "-=0.4",
            )
            .fromTo(
              ".contact-info-item",
              { x: isMobile ? 0 : -30, y: isMobile ? 20 : 0, autoAlpha: 0 },
              {
                x: 0,
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.5)",
              },
              "-=0.4",
            )
            .fromTo(
              ".contact-form-container",
              {
                x: isMobile ? 0 : 30,
                y: isMobile ? 30 : 0,
                autoAlpha: 0,
                scale: 0.98,
              },
              { x: 0, y: 0, autoAlpha: 1, scale: 1, duration: 0.8 },
              "-=0.6",
            )
            .fromTo(
              ".contact-form-item",
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.5",
            );
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      id="contact"
      ref={container}
      className="relative bg-background py-24 md:py-32 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="contact-blob absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-primary/10 dark:bg-primary/20 blur-[120px] rounded-full" />
        <div className="contact-blob absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-accent/10 dark:bg-accent/20 blur-[100px] rounded-full" />
      </div>

      <div className="contact-content-wrapper relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 invisible">
        {/* Section heading */}
        <div className="contact-heading-wrapper mb-16">
          <h2 className="contact-heading text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Touch
            </span>
          </h2>
          <div className="contact-bar mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-accent/50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div className="contact-text">
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
                Let&apos;s Build Something Amazing Together
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a question, a project idea, or just want to say
                hi, my inbox is always open. I will try my best to get back to
                you!
              </p>
            </div>

            <div className="space-y-11">
              <div className="contact-info-item flex items-start gap-4">
                <div className="mt-1 p-3 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:youssefmohammed2093@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    youssefmohammed2093@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4">
                <div className="mt-1 p-3 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Location
                  </h4>
                  <p className="text-muted-foreground">Mansoura, Egypt</p>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4">
                <div className="mt-1 p-3 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                  <FaLinkedin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    LinkedIn
                  </h4>
                  <a
                    href="https://www.linkedin.com/in/youssef-mohammed-6893a031b/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    Youssef Mohammed
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4">
                <div className="mt-1 p-3 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                  <FaGithub className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    GitHub
                  </h4>
                  <a
                    href="https://github.com/YoussefMohammed93"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    YoussefMohammed93
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-container bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-lg shadow-primary/5 relative overflow-hidden">
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-4 min-h-[300px] animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 text-primary">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. I will get back to you as soon as
                  possible.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => window.location.reload()}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="contact-form-item space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-background/50 border-border/50 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/50 transition-all focus:border-transparent! rounded-xl"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-destructive text-sm"
                  />
                </div>

                <div className="contact-form-item space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    className="bg-background/50 border-border/50 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/50 transition-all focus:border-transparent! transition-all rounded-xl"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-destructive text-sm"
                  />
                </div>

                <div className="contact-form-item space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    className="min-h-[150px] bg-background/50 resize-none border-border/50 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/50 transition-all focus:border-transparent! transition-all rounded-xl"
                    required
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-destructive text-sm"
                  />
                </div>

                <div className="contact-form-item">
                  <Button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full gap-2 font-medium rounded-xl h-11 transition-all group overflow-hidden relative"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {state.submitting ? "Sending Message..." : "Send Message"}
                      {!state.submitting && <Send className="size-4" />}
                    </span>
                    <div className="absolute inset-0 bg-primary-foreground/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  </Button>
                </div>

                {state.errors && (
                  <div className="contact-form-item p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mt-4 text-center">
                    Something went wrong, please check your details and try
                    again.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
