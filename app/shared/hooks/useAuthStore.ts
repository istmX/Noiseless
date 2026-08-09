import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  userTier: string;
  setProfile: (profile: { name: string; email: string; avatarUrl: string; tier: string }) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  userName: "Analyst",
  userEmail: "",
  userAvatarUrl: "",
  userTier: "FREE",
  setProfile: (profile) =>
    set({
      userName: profile.name,
      userEmail: profile.email,
      userAvatarUrl: profile.avatarUrl,
      userTier: profile.tier,
    }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));

