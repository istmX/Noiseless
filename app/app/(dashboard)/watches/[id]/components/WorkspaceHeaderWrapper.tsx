"use client";

import { useState } from "react";
import { Watch } from "../../types";
import { WatchDetailHeader } from "./WatchDetailHeader";
import { WatchSettings } from "./WatchSettings";

interface WorkspaceHeaderWrapperProps {
  watch: Watch;
  findingsCount: number;
  digestsCount: number;
}

export function WorkspaceHeaderWrapper({
  watch,
  findingsCount,
  digestsCount,
}: WorkspaceHeaderWrapperProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <WatchDetailHeader
        watch={watch}
        findingsCount={findingsCount}
        digestsCount={digestsCount}
        onSettingsToggle={() => setShowSettings((s) => !s)}
        showSettings={showSettings}
      />
      <WatchSettings 
        watch={watch} 
        open={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
}
