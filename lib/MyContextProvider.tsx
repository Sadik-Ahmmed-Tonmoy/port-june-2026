"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type TContextProvider = {
  windowWidth: number;
  isSmallDevice: boolean;
};

export const ContextProvider = createContext<TContextProvider | null>(null);

const MyContextProvider = ({ children }: {children: ReactNode}) => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);


  const infoProvider: TContextProvider = {
    windowWidth,
    isSmallDevice: windowWidth < 1280, // breakpoint for mobile/tablet
  };

  return (
    <ContextProvider.Provider value={infoProvider}>
      {children}
    </ContextProvider.Provider>
  );
};

export default MyContextProvider;