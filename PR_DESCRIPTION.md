# TTS Download Plugin

## Summary

This PR introduces a new plugin that enables downloading Perplexity AI messages and conversations as audio files using text-to-speech functionality.

## Features

- **Individual Message Download**: Download any assistant message as a WAV audio file with a single click from the message action bar
- **Full Conversation Download**: Download entire threads as a single concatenated audio file via navbar button
- **Multiple Voice Options**: Choose from 4 TTS voices (Mike, Alex, Kate, Mary) with customizable default
- **Progress Tracking**: Visual progress indicator for multi-message conversation downloads
- **Seamless Integration**: Download buttons integrated into existing UI (message action bars and navbar)

## Technical Implementation

### Architecture

The plugin leverages Perplexity's native `voice_over` WebSocket API:

1. **WebSocket Connection**: Uses `InternalWebSocketManager` to establish connection
2. **Audio Streaming**: Receives audio as Int16Array chunks via `audio` events
3. **Chunk Collection**: `AudioBufferCollector` accumulates chunks in memory
4. **WAV Encoding**: `WavEncoder` converts PCM chunks to WAV format with proper RIFF headers
5. **File Download**: Uses File System Access API (Chrome) with blob download fallback

### Audio Specifications

- **Sample Rate**: 48kHz
- **Bit Depth**: 16-bit
- **Channels**: Mono (1 channel)
- **Format**: WAV (RIFF header)

### Key Components

**Components:**
- `TtsDownloadButton.tsx` - Individual message download button
- `ThreadTtsDownloadButton.tsx` - Full conversation download button
- `VoiceSelectionDialog.tsx` - Voice picker dialog

**Hooks:**
- `useTtsDownloadRequest.ts` - Core hook for WebSocket communication and audio streaming

**Utilities:**
- `AudioBufferCollector` - Audio chunk management
- `WavEncoder` - PCM to WAV conversion
- `download-wav.ts` - WAV file download handler

### Files Changed

- **14 files changed** (all new files except one enhancement)
- **915 additions**, 9 modifications
- Enhanced `download-file.ts` to support binary audio data (ArrayBuffer) and audio MIME types

### Dependencies

- Requires `domObservers:thread:messageBlocks` plugin

## Usage

### Individual Message Download

1. Navigate to any Perplexity thread
2. Hover over an assistant message
3. Click the download icon in the action bar
4. Audio file downloads automatically with default voice

### Full Conversation Download

1. Click the download button in the navbar
2. Select desired voice from the dialog
3. Wait for progress to complete
4. Audio file saves with timestamp in filename

## Settings

Users can configure:
- **Default Voice**: Select preferred voice for single-message downloads
- **Enabled**: Toggle plugin on/off

## Error Handling

The plugin handles:
- WebSocket connection failures
- Missing audio data
- User cancellation (File System Access API)
- Individual message failures in batch downloads (continues with next message)

## Testing

Tested on:
- Chrome (with File System Access API)
- Firefox (with blob download fallback)
- Various conversation lengths and message types

## Future Enhancements

Potential improvements documented in README:
- Additional audio formats (MP3, OGG)
- Voice selection for individual messages
- Audio quality settings
- Batch download with ZIP archive
- Pause/resume for long conversations
- Audio preview before download

## Related Documentation

Complete technical documentation available in: `perplexity/extension/src/plugins/_thread/tts-download/README.md`

---

This plugin provides a valuable feature for users who want to consume Perplexity content in audio format, making the platform more accessible and enabling multi-tasking scenarios.
