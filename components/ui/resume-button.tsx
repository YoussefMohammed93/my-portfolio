"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeButtonProps {
  className?: string;
  mobile?: boolean;
}

export function ResumeButton({ className, mobile }: ResumeButtonProps) {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    // 1. Trigger the actual download
    const link = document.createElement("a");
    link.href = "/Youssef-Mohammed-Resume.pdf";
    link.download = "Youssef-Mohammed-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Run success animation
    setIsDownloaded(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsDownloaded(false);
    }, 3000);
  };

  if (mobile) {
    return (
      <Button
        onClick={handleDownload}
        variant="outline"
        className={cn(
          "w-full h-14 rounded-xl flex items-center justify-center gap-3 transition-none",
          isDownloaded
            ? "border-green-500! bg-green-500/10 text-green-500"
            : "border-border text-foreground",
          className,
        )}
      >
        {isDownloaded ? (
          <>
            <Check className="size-5" />
            <span className="font-bold">Resume Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="size-5" />
            <span className="font-bold uppercase tracking-wider">
              Download CV
            </span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className={cn(
        "nav-action opacity-0 relative overflow-hidden h-9 px-4 rounded-full border-transparent bg-transparent hover:bg-primary/10 dark:hover:bg-primary/10 dark:border-transparent dark:hover:border-transparent hover:text-primary transition-none",
        isDownloaded && "border-green-500 bg-green-500/10",
        className,
      )}
    >
      <div className="relative flex items-center gap-2">
        {isDownloaded ? (
          <div className="flex items-center gap-2 text-green-500 animate-in fade-in zoom-in duration-150">
            <Check className="size-4" />
            <span className="text-xs font-bold whitespace-nowrap">Done!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Download className="size-4" />
            <span className="text-xs font-bold uppercase tracking-tight">
              Resume
            </span>
          </div>
        )}
      </div>
    </Button>
  );
}
