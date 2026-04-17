"use client";

import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <LoadingContext.Provider
      value={{ isLoaded, setIsLoaded, progress, setProgress }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
