import { lazily } from "react-lazily";

import type { UiGroupId } from "@/__registries__/cs-ui/types";
import { withPluginsGuard } from "@/plugins/__async-deps__/plugins-guard/withPluginsGuard";

const { ExportButtonComponent } = lazily(
  () => import("./ExportButtonComponent")
);

const ExportButton = withPluginsGuard(ExportButtonComponent, {
  dependentPluginIds: ["threadExportToLlm"],
});

export const uiGroup: UiGroupId = "thread:messageBlocks:footer";

export default ExportButton;
