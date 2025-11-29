# Thread Export to LLM Plugin

A plugin that allows users to export entire conversation threads with their full context to other LLMs like AI Studio, Claude, and ChatGPT.

## Features

- **Export entire threads**: Capture all messages and context from Perplexity threads
- **Multiple export formats**: Support for Markdown, JSON, and Plain Text
- **Metadata inclusion**: Optional metadata export (thread ID, title, model, URL, timestamps)
- **Multiple LLM targets**: Direct export to AI Studio, Claude, ChatGPT, or custom endpoints
- **One-click operation**: Copy to clipboard and open target LLM in a single click

## Plugin Structure

```
thread-export-to-llm/
├── index.manifest.ts           # Plugin registration and settings schema
├── types.ts                    # TypeScript type definitions
├── utils.ts                    # Export formatting and utility functions
├── store.ts                    # Zustand store for state management
├── settings-ui.tsx             # Plugin settings UI
├── components/
│   ├── ExportButton.cs-ui.tsx  # UI group registration
│   └── ExportButtonContent.tsx # Export button component
└── hooks/
    └── useThreadExport.ts      # Export functionality hook
```

## Implementation Details

### Plugin Manifest

- **ID**: `threadExportToLlm`
- **Dependencies**: 
  - Core plugins: `spaRouter`, `domObservers:thread:messageBlocks`
  - UI groups: `thread:messageBlocks:footer`
- **Default settings**:
  - Enabled: `false` (must be manually enabled)
  - Export format: `markdown`
  - Include metadata: `true`
  - Target LLM: `ai-studio`

### Export Formats

1. **Markdown**: Formatted with headers, message roles, and optional citations
2. **JSON**: Structured data with all metadata and message content
3. **Plain Text**: Simple text format with minimal formatting

### Target LLMs

- **Google AI Studio**: https://aistudio.google.com/app/prompts/new
- **Claude**: https://claude.ai/new
- **ChatGPT**: https://chat.openai.com/
- **Custom**: User-defined endpoint URL

### User Flow

1. User navigates to a Perplexity thread
2. User sees "Export to LLM" button in message footer area
3. User clicks the button
4. Plugin:
   - Collects all thread messages and metadata
   - Formats content according to user settings
   - Copies formatted content to clipboard
   - Opens target LLM in a new tab
5. User pastes content into the target LLM

## Settings

The plugin provides a settings UI with the following options:

- **Enable/Disable**: Toggle to activate the plugin
- **Export Format**: Choose between Markdown, JSON, or Plain Text
- **Include Metadata**: Toggle to include/exclude thread metadata
- **Target LLM**: Select destination LLM (AI Studio, Claude, ChatGPT, or Custom)
- **Custom API Endpoint**: Optional custom URL (shown only when "Custom" is selected)

## Technical Notes

- Uses the existing `threadMessageBlocksDomObserverStore` to access thread data
- Integrates with the `thread:messageBlocks:footer` UI group for button placement
- Implements proper plugin guards to ensure the plugin is enabled before running
- Follows the repository's plugin architecture patterns
- All code passes ESLint with no errors
- Successfully builds with the extension build process

## Future Enhancements

Potential improvements could include:

- Batch export of multiple threads
- Export history and management
- Custom formatting templates
- Direct API integration with LLMs (not just clipboard copy)
- Export to file download
- Scheduled/automated exports
