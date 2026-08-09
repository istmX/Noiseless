import { ElementType } from "react";

export interface NavItem {
  icon: ElementType;
  label: string;
  href: string;
  badge?: string | number;
}

export interface CommandItem {
  id: string;
  title: string;
  category: "navigation" | "watch" | "action";
  href?: string;
  action?: () => void;
  shortcut?: string;
}
