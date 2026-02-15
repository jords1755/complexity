import type { PluginId } from "@/__registries__/plugins/meta.types";
import { Switch } from "@/components/ui/switch";
import useExtensionSettings from "@/services/infra/extension-api-wrappers/extension-settings/useExtensionSettings";

export const pluginId: PluginId = "threadExportToLlm";

export default function ThreadExportToLlmSettingsUi() {
  const { settings, mutation } = useExtensionSettings();
  const pluginSettings = settings?.plugins?.threadExportToLlm;

  if (!settings) return null;

  return (
    <div className="x:flex x:max-w-lg x:flex-col x:gap-4">
      <Switch
        textLabel="Enable"
        checked={pluginSettings?.enabled ?? false}
        onCheckedChange={({ checked }) => {
          mutation.mutate((draft) => {
            draft.plugins.threadExportToLlm.enabled = checked;
          });
        }}
      />

      <div className="x:flex x:flex-col x:gap-2">
        <label className="x:text-sm x:font-medium">Export Format</label>
        <select
          className="x:rounded x:border x:border-gray-300 x:px-3 x:py-2"
          value={pluginSettings?.exportFormat ?? "markdown"}
          onChange={(e) => {
            mutation.mutate((draft) => {
              draft.plugins.threadExportToLlm.exportFormat = e.target.value as
                | "json"
                | "markdown"
                | "plaintext";
            });
          }}
        >
          <option value="markdown">Markdown</option>
          <option value="json">JSON</option>
          <option value="plaintext">Plain Text</option>
        </select>
      </div>

      <Switch
        textLabel="Include Metadata"
        checked={pluginSettings?.includeMetadata ?? true}
        onCheckedChange={({ checked }) => {
          mutation.mutate((draft) => {
            draft.plugins.threadExportToLlm.includeMetadata = checked;
          });
        }}
      />

      <div className="x:flex x:flex-col x:gap-2">
        <label className="x:text-sm x:font-medium">Target LLM</label>
        <select
          className="x:rounded x:border x:border-gray-300 x:px-3 x:py-2"
          value={pluginSettings?.targetLlm ?? "ai-studio"}
          onChange={(e) => {
            mutation.mutate((draft) => {
              draft.plugins.threadExportToLlm.targetLlm = e.target.value as
                | "ai-studio"
                | "claude"
                | "chatgpt"
                | "custom";
            });
          }}
        >
          <option value="ai-studio">Google AI Studio</option>
          <option value="claude">Claude</option>
          <option value="chatgpt">ChatGPT</option>
          <option value="custom">Custom Endpoint</option>
        </select>
      </div>

      {pluginSettings?.targetLlm === "custom" && (
        <div className="x:flex x:flex-col x:gap-2">
          <label className="x:text-sm x:font-medium">Custom API Endpoint</label>
          <input
            type="text"
            className="x:rounded x:border x:border-gray-300 x:px-3 x:py-2"
            value={pluginSettings?.customApiEndpoint ?? ""}
            placeholder="https://example.com/api"
            onChange={(e) => {
              mutation.mutate((draft) => {
                draft.plugins.threadExportToLlm.customApiEndpoint =
                  e.target.value;
              });
            }}
          />
        </div>
      )}

      <div className="x:mt-4 x:rounded x:bg-blue-50 x:p-4">
        <p className="x:text-sm x:text-gray-700">
          Click the "Export to LLM" button in any thread message footer to export
          the entire conversation with context. The content will be copied to
          your clipboard and the target LLM will open in a new tab.
        </p>
      </div>
    </div>
  );
}
