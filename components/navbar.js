"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 70 && currentScrollY >= lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollY <= lastScrollY - 1) {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full fixed z-30 left-0 top-8 flex justify-center transition-transform duration-300 ${
        showNavbar ? "transform-none" : "transform -translate-y-24"
      }`}
    >
      <ul
        className="flex items-center gap-6 sm:gap-8 px-12 py-4 rounded-lg border border-[#ffffff20]"
        style={{ background: "linear-gradient(90deg, #161a31, #06091f)" }}
      >
        <li>
          <Link
            href="/"
            className="text-white text-sm sm:text-base hover:text-gray-300 duration-200 transition-all"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white text-sm sm:text-base hover:text-gray-300 duration-200 transition-all"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white text-sm sm:text-base hover:text-gray-300 duration-200 transition-all"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-white text-sm sm:text-base hover:text-gray-300 duration-200 transition-all"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
