import "./globals.css";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/ui/preloader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { LoadingProvider } from "@/components/loading-context";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { IBM_Plex_Sans, Montserrat, Space_Grotesk } from "next/font/google";

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
            enableSystem
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
