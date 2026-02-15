import { useCallback } from "react";

import { toast } from "@/components/ui/use-toast";
import { useExportStore } from "@/plugins/thread-export-to-llm/store";
import {
  collectThreadContext,
  exportToClipboard,
  formatContent,
  openInTargetLlm,
} from "@/plugins/thread-export-to-llm/utils";
import useExtensionSettings from "@/services/infra/extension-api-wrappers/extension-settings/useExtensionSettings";

export function useThreadExport() {
  const { settings } = useExtensionSettings();
  const pluginSettings = settings?.plugins?.threadExportToLlm;
  const { isExporting, setIsExporting, setLastExport } = useExportStore();

  const handleExport = useCallback(async () => {
    if (!pluginSettings?.enabled) {
      toast({
        title: "Plugin Disabled",
        description: "Thread Export to LLM plugin is not enabled",
      });
      return;
    }

    setIsExporting(true);

    try {
      // Collect thread context
      const context = collectThreadContext();

      if (!context) {
        toast({
          title: "No Thread Data",
          description: "Could not find any messages in the current thread",
        });
        return;
      }

      // Format content based on settings
      const formattedContent = formatContent(
        context,
        pluginSettings.exportFormat || "markdown",
        pluginSettings.includeMetadata ?? true
      );

      // Copy to clipboard
      await exportToClipboard(formattedContent);

      // Store the export
      setLastExport(formattedContent);

      // Show success notification
      toast({
        title: "✓ Thread Exported",
        description: `Content copied to clipboard in ${pluginSettings.exportFormat} format`,
      });

      // Open target LLM
      const targetLlm = pluginSettings.targetLlm || "ai-studio";
      const customEndpoint = pluginSettings.customApiEndpoint;
      
      openInTargetLlm(targetLlm, customEndpoint);
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "❌ Export Failed",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsExporting(false);
    }
  }, [pluginSettings, setIsExporting, setLastExport]);

  return {
    handleExport,
    isExporting,
    isEnabled: pluginSettings?.enabled ?? false,
  };
}
