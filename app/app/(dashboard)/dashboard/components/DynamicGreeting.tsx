"use client";

import { useEffect, useState } from "react";

export function DynamicGreeting({ name }: { name?: string | null }) {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const displayName = name ? name.split(" ")[0] : "Analyst";

  return (
    <h1 className="text-display font-display text-ink mb-2">
      {greeting}, {displayName}.
    </h1>
  );
}
