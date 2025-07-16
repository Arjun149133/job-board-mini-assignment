"use client";

import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

type AppContextType = {
  userId: string | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setUser = (token: string) => {
    setToken(token);
    try {
      const decoded: any = jwt.decode(token);
      setUserId(decoded?.userId || null);
    } catch (error) {
      console.error("Failed to decode token", error);
      setUserId(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(storedToken);
    }
  }, []);

  return (
    <AppContext.Provider value={{ userId, token, setToken, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
