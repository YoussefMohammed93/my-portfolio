"use client";

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/loading-context";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";

import { useGSAP } from "@gsap/react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const lenis = useLenis();
  const { isLoaded } = useLoading();
  const container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!isLoaded) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.5 },
      });

      tl.fromTo(
        [".nav-logo", ".nav-action"],
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.6,
        },
      ).fromTo(
        ".nav-link",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
        },
        "-=1.1",
      );
    },
    { scope: container, dependencies: [isLoaded] },
  );

  const closeMenu = () => setIsOpen(false);

  const handleScroll = (href: string) => {
    closeMenu();
    lenis?.scrollTo(href);
  };

  return (
    <header
      ref={container}
      className="fixed top-0 left-0 right-0 z-50 bg-secondary/50 dark:bg-muted/40 backdrop-blur-sm border-b border-border/40"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <MagneticWrapper>
            <Link
              href="/"
              className="nav-logo opacity-0 flex items-end gap-1 hover:opacity-90 transition-opacity"
              onClick={closeMenu}
              data-cursor="logo"
            >
              <Image
                src="/logo.png"
                alt="Youssef Mohammed"
                width={48}
                height={48}
                className="size-12 rounded-lg overflow-hidden object-cover"
              />
              <span className="text-2xl font-bold font-montserrat tracking-tight pb-1 pt-2">
                YM
              </span>
            </Link>
          </MagneticWrapper>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <MagneticWrapper>
                    <button
                      onClick={() => handleScroll(link.href)}
                      className="nav-link opacity-0 text-muted-foreground hover:text-primary transition-colors cursor-pointer py-1 px-2"
                      data-cursor="link"
                    >
                      {link.name}
                    </button>
                  </MagneticWrapper>
                </li>
              ))}
            </ul>

            <div className="flex items-center ml-4 border-l border-border/40 pl-4">
              <MagneticWrapper>
                <Button
                  size="icon"
                  className="nav-action opacity-0 bg-transparent text-foreground hover:bg-primary/15 rounded-full hover:text-primary"
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  data-cursor="hover"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </MagneticWrapper>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              className="nav-action opacity-0 size-10! hover:bg-accent! hover:text-accent-foreground transition-colors"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                className="nav-action opacity-0 inline-flex items-center justify-center rounded-md h-10 w-10 hover:bg-accent hover:text-accent-foreground transition-colors group"
                data-cursor="hover"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent
                showCloseButton={false}
                side="left"
                className="w-[85vw] sm:w-[400px] border-l border-border/20 bg-muted/80 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl flex flex-col"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-2 mt-8 flex-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleScroll(link.href)}
                      className="group flex items-center justify-between w-full text-left rounded-xl px-4 py-4 text-xl font-semibold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">
                        &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
