# Songbook Node Starter

A simple Node.js starter for a church songbook project using **ChordPro** as the editable source format.

## Features

- Load songs from `.cho` files
- Keep song number, key, categories, and scripture references
- Parse ChordPro metadata and sections
- Transpose chords
- Search songs by title, number, lyrics, or scripture
- Simple browser editor
- Projector-ready full-screen lyrics view
- Service order / set list builder
- Drag-and-drop reordering in the service builder
- Per-service-item transpose control
- Separate musician key override without changing the master song
- Service projector screen
- Two-pane live preview with chords for musicians and lyrics-only for projector
- Phone remote for projector navigation
- QR code pairing for opening the exact phone remote
- Automatic alphabetical index
- Automatic scripture index
- Export JSON for a SwiftUI app or web frontend

## Quick start

```bash
npm install
npm run dev
```

## Main screens

```bash
http://localhost:3000/editor
http://localhost:3000/service-builder
http://localhost:3000/service-projector/sample-sunday-service?id=sample-sunday-service
http://localhost:3000/live-preview/sample-sunday-service?id=sample-sunday-service
http://localhost:3000/remote/sample-sunday-service?id=sample-sunday-service
```

## QR pairing

From the service builder:
1. Save or open a service order
2. Optionally enter your public base URL
3. Click **Generate QR**
4. Scan with your phone
5. The phone opens the exact remote screen for that service

API:
```bash
GET /pairing/remote/:serviceId
GET /pairing/remote/:serviceId?baseUrl=https://your-site.vercel.app
```

## Notes

- On localhost, the QR code will point to the current local host unless you provide a public `baseUrl`.
- For phone scanning on the same Wi‑Fi, use your computer’s LAN IP as the base URL, for example:
  `http://192.168.1.25:3000`


## Video example links

Songs can now include an optional external example URL:

```cho
{video_example: https://www.youtube.com/watch?v=example}
```

This now works in three places:
- the browser editor shows a dedicated **Video example URL** field
- the JSON export includes `videoExample`
- the web song view can open the example directly

Screens:
```bash
http://localhost:3000/editor
http://localhost:3000/song/turn-your-eyes-upon-jesus?id=turn-your-eyes-upon-jesus
```


## Scan-faithful lead-sheet batch 1

Songs 1-10 have been rebuilt in scan-faithful lead-sheet format.
Renderer updates now preserve chord-over-word spacing better in song view, projector view, and service views.
