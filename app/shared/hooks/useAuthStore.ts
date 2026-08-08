import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
  setProfile: (profile: { name: string; email: string; avatarUrl: string }) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  userName: "Analyst",
  userEmail: "",
  userAvatarUrl: "",
  setProfile: (profile) =>
    set({
      userName: profile.name,
      userEmail: profile.email,
      userAvatarUrl: profile.avatarUrl,
    }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
