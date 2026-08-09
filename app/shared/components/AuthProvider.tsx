"use client";

import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

interface AuthProfile {
  readonly name: string;
  readonly email: string;
  readonly avatarUrl: string;
  readonly tier: string;
}

export function AuthProvider({
  isLoggedIn,
  profile,
  children,
}: {
  isLoggedIn: boolean;
  profile?: AuthProfile;
  children: React.ReactNode;
}) {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setProfile = useAuthStore((state) => state.setProfile);

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    if (profile) setProfile(profile);
  }, [isLoggedIn, profile, setLoggedIn, setProfile]);

  return <>{children}</>;
}
