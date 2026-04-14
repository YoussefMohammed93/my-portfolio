import "./globals.css";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
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
  title: "Youssef Mohammed | Full-Stack MERN Developer",
  description:
    "Portfolio of Youssef Mohammed, a Full-Stack MERN Developer and CS student at Mansoura University building modern, scalable web applications.",
  keywords: [
    "Youssef Mohammed",
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Youssef Mohammed" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssefmohammed.dev",
    title: "Youssef Mohammed | Full-Stack MERN Developer",
    description:
      "Portfolio of Youssef Mohammed, a Full-Stack MERN Developer and CS student building modern, scalable web applications.",
    siteName: "Youssef Mohammed Portfolio",
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
        <CustomCursor />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <Navbar />
            <main className="flex-1 w-full pt-16">{children}</main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
