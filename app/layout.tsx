import "./globals.css";

import dynamic from "next/dynamic";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { LoadingProvider } from "@/components/loading-context";
import { IBM_Plex_Sans, Montserrat, Space_Grotesk } from "next/font/google";

const Preloader = dynamic(() =>
  import("@/components/ui/preloader").then((mod) => mod.Preloader),
);

const ScrollProgress = dynamic(() =>
  import("@/components/ui/scroll-progress").then((mod) => mod.ScrollProgress),
);

const ScrollToTop = dynamic(() =>
  import("@/components/ui/scroll-to-top").then((mod) => mod.ScrollToTop),
);

const CustomCursor = dynamic(() =>
  import("@/components/ui/custom-cursor").then((mod) => mod.CustomCursor),
);

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youssefmohammed.dev"),
  title: "Youssef Mohammed | Full-Stack Developer",
  description:
    "Explore the work of Youssef Mohammed, a specialized Full-Stack MERN Developer crafting high-performance, visually stunning web experiences.",
  keywords: [
    "Youssef Mohammed",
    "Full-Stack Developer",
    "MERN Stack",
    "Web Animations",
    "Next.js Expert",
    "GSAP",
    "React Developer",
  ],
  authors: [{ name: "Youssef Mohammed" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssefmohammed.dev",
    title: "Youssef Mohammed | Full-Stack Developer",
    description:
      "Crafting pixel-perfect, scalable web applications with MERN Stack and advanced animations.",
    siteName: "Youssef Mohammed Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Youssef Mohammed Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Mohammed | Full-Stack Developer",
    description:
      "Crafting pixel-perfect, scalable web applications with MERN Stack and advanced animations.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        ibmPlexSans.variable,
        spaceGrotesk.variable,
        montserrat.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <LoadingProvider>
          <Preloader />
          <ScrollProgress />
          <ScrollToTop />
          <CustomCursor />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <TooltipProvider>
              <LenisProvider>
                <Navbar />
                <main className="flex-1 w-full pt-16">{children}</main>
                <Footer />
              </LenisProvider>
            </TooltipProvider>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
