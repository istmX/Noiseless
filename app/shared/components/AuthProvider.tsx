"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export function AuthProvider({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const pathname = usePathname();
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.setState({ isLoggedIn });
    initialized.current = true;
  }

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn, setLoggedIn]);

  const isDashboardRoute =
    pathname === "/dashboard" ||
    pathname?.startsWith("/watches") ||
    pathname?.startsWith("/agent") ||
    pathname?.startsWith("/settings") ||
    pathname?.startsWith("/checkout");

  const showSidebar = isLoggedIn && isDashboardRoute;

  if (!showSidebar) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-canvas">
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full">
          {children}
        </main>
      </div>
    );
  }

  // Sidebar is always a fixed 64px icon rail on desktop
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full pl-0 md:pl-16">
        {children}
      </main>
    </div>
  );
}
