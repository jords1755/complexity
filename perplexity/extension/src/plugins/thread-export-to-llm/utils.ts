import { threadMessageBlocksDomObserverStore } from "@/plugins/__core__/dom-observers/thread/message-blocks/store";
import type {
  ExportFormat,
  TargetLlm,
  ThreadContext,
} from "@/plugins/thread-export-to-llm/types";

/**
 * Collect all messages and metadata from the current Perplexity thread
 */
export function collectThreadContext(): ThreadContext | null {
  const messageBlocks =
    threadMessageBlocksDomObserverStore.getState().messageBlocks;

  if (messageBlocks == null || messageBlocks.length === 0) {
    return null;
  }

  const url = window.location.href;
  const threadId = url.split("/").pop() ?? "";
  const title = messageBlocks[0]?.content.title ?? "Untitled Thread";

  // Interleave user and assistant messages
  const interleavedMessages = [];
  for (const block of messageBlocks) {
    interleavedMessages.push({
      role: "user" as const,
      content: block.content.title,
      timestamp: new Date().toISOString(),
      attachments:
        block.content.webResults?.map((result) => result.url) ?? [],
    });
    interleavedMessages.push({
      role: "assistant" as const,
      content: block.content.answer,
      timestamp: new Date().toISOString(),
      attachments: [],
    });
  }

  return {
    messages: interleavedMessages,
    metadata: {
      threadId,
      title,
      createdAt: new Date().toISOString(),
      model: messageBlocks[0]?.content.displayModel ?? "unknown",
      url,
    },
  };
}

/**
 * Format the thread context as markdown
 */
export function formatAsMarkdown(context: ThreadContext): string {
  let markdown = "";

  if (context.metadata != null) {
    markdown += `# ${context.metadata.title}\n\n`;
    markdown += `**Thread ID:** ${context.metadata.threadId}\n`;
    markdown += `**Model:** ${context.metadata.model}\n`;
    markdown += `**URL:** ${context.metadata.url}\n`;
    markdown += `**Created:** ${context.metadata.createdAt}\n\n`;
    markdown += "---\n\n";
  }

  for (const message of context.messages) {
    const roleLabel = message.role === "user" ? "**User**" : "**Assistant**";
    markdown += `${roleLabel}:\n\n${message.content}\n\n`;

    if (
      message.attachments != null &&
      message.attachments.length > 0
    ) {
      markdown += `*Sources:*\n`;
      for (const attachment of message.attachments) {
        markdown += `- ${attachment}\n`;
      }
      markdown += "\n";
    }
  }

  return markdown;
}

/**
 * Format the thread context as JSON
 */
export function formatAsJson(context: ThreadContext): string {
  return JSON.stringify(context, null, 2);
}

/**
 * Format the thread context as plain text
 */
export function formatAsPlaintext(context: ThreadContext): string {
  let text = "";

  if (context.metadata != null) {
    text += `${context.metadata.title}\n`;
    text += `Thread ID: ${context.metadata.threadId}\n`;
    text += `Model: ${context.metadata.model}\n`;
    text += `URL: ${context.metadata.url}\n`;
    text += `Created: ${context.metadata.createdAt}\n\n`;
    text += "---\n\n";
  }

  for (const message of context.messages) {
    const roleLabel = message.role === "user" ? "User" : "Assistant";
    text += `${roleLabel}:\n${message.content}\n\n`;

    if (
      message.attachments != null &&
      message.attachments.length > 0
    ) {
      text += `Sources:\n`;
      for (const attachment of message.attachments) {
        text += `- ${attachment}\n`;
      }
      text += "\n";
    }
  }

  return text;
}

/**
 * Copy content to clipboard
 */
export async function exportToClipboard(content: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(content);
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = content;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Open target LLM in a new tab with content ready to paste
 */
export function openInTargetLlm(targetLlm: TargetLlm, customEndpoint?: string): void {
  const urls: Record<TargetLlm, string> = {
    "ai-studio": "https://aistudio.google.com/app/prompts/new",
    "claude": "https://claude.ai/new",
    "chatgpt": "https://chat.openai.com/",
    "custom": customEndpoint || "",
  };

  const url = urls[targetLlm];
  if (url !== "") {
    window.open(url, "_blank");
  }
}

/**
 * Format content based on export format and settings
 */
export function formatContent(
  context: ThreadContext,
  format: ExportFormat,
  includeMetadata: boolean
): string {
  // Remove metadata if not included
  const contextToFormat =
    includeMetadata === true
      ? context
      : {
          ...context,
          metadata: {
            ...context.metadata,
            threadId: "",
            createdAt: "",
            model: "",
            url: "",
          },
        };

  switch (format) {
    case "json":
      return formatAsJson(contextToFormat);
    case "markdown":
      return formatAsMarkdown(contextToFormat);
    case "plaintext":
      return formatAsPlaintext(contextToFormat);
    default:
      return formatAsMarkdown(contextToFormat);
  }
}
