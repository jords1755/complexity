import React from "react";

import { Button } from "@/components/ui/button";
import { useThreadExport } from "@/plugins/thread-export-to-llm/hooks/useThreadExport";

import TablerExternalLink from "~icons/tabler/external-link";
import TablerLoader from "~icons/tabler/loader-2";

export function ExportButtonComponent() {
  const { handleExport, isExporting, isEnabled } = useThreadExport();

  if (!isEnabled) {
    return null;
  }

  return (
    <Button
      className="x:flex x:items-center x:gap-1 x:text-xs"
      disabled={isExporting}
      size="sm"
      title="Export thread to LLM"
      variant="ghost"
      onClick={handleExport}
    >
      {isExporting ? (
        <TablerLoader className="x:h-4 x:w-4 x:animate-spin" />
      ) : (
        <TablerExternalLink className="x:h-4 x:w-4" />
      )}
      <span>Export to LLM</span>
    </Button>
  );
}
