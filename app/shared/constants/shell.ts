import { LayoutDashboard, List, Settings } from "lucide-react";
import { NavItem } from "../types/shell";

export const NAV_ITEMS: readonly NavItem[] = [
  { icon: LayoutDashboard, label: "Now", href: "/dashboard" },
  { icon: List, label: "Watches", href: "/watches" },
  { icon: Settings, label: "Settings", href: "/settings" },
] as const;
