"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export function AuthProvider({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.setState({ isLoggedIn });
    initialized.current = true;
  }

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn, setLoggedIn]);

  return <>{children}</>;
}
