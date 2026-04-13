"use client";

import Link from "next/link";
import Image from "next/image";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";

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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleScroll = (href: string) => {
    closeMenu();
    lenis?.scrollTo(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/50 dark:bg-muted/40 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-end gap-1 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="Youssef Mohammed"
              width={48}
              height={48}
              className="size-12 rounded-lg overflow-hidden object-cover"
            />
            <span className="text-xl font-bold font-montserrat tracking-tight pb-1.5">
              YM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center ml-4 border-l border-border/40 pl-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.href)}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
