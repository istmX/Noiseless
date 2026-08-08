"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Sidebar } from "./Sidebar";

export function AuthProvider({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const sidebarCollapsed = useAuthStore((state) => state.sidebarCollapsed);
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.setState({ isLoggedIn });
    initialized.current = true;
  }

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn, setLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-canvas">
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto overflow-x-hidden w-full transition-all duration-300 ${
        sidebarCollapsed ? "pl-0 md:pl-16" : "pl-0 md:pl-64"
      }`}>
        {children}
      </main>
    </div>
  );
}
