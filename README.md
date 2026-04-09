# Furniture Vision

**Mobile app that turns a photo of a bookshelf into a customizable 3D model using AI.** Take a picture, and Gemini Vision analyzes dimensions, shelf count, and material in seconds. Fine-tune every detail in the interactive 3D viewer and export the image.

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r128-000000?logo=threedotjs&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-Vision-4285F4?logo=google&logoColor=white)

## How It Works

```
📸 Take a photo  →  🤖 AI analyzes  →  📐 3D model  →  🎛️ Customize  →  📤 Export
```

1. **Capture** — Take a photo of a bookshelf (or pick from gallery)
2. **AI Analysis** — Gemini Vision estimates dimensions, shelf count, and material
3. **3D Viewer** — Interactive Three.js bookshelf with procedural wood textures
4. **Configure** — Adjust width, height, depth, shelf count, and material (9 wood types)
5. **Export** — Save a 3D snapshot and share it

## Quick Start

```bash
# 1. Clone
git clone https://github.com/MarcosMatsuda/furniture-vision.git
cd furniture-vision

# 2. Install
npm install

# 3. Get a free Gemini API key
#    → https://aistudio.google.com/apikeys

# 4. Configure
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env → paste your GEMINI_API_KEY

# 5. Run
./start
```

The API starts on `http://localhost:3335` and Expo Metro on port `8082`.
Scan the QR code with **Expo Go** on your phone.

> **Note:** If testing on a physical device, edit `apps/mobile/.env` and replace `localhost` with your machine's IP address.

## Project Structure

```
furniture-vision/
├── apps/
│   ├── api/              # NestJS — Gemini Vision proxy
│   └── mobile/           # React Native + Expo
│       ├── app/          # Expo Router (file-based routes)
│       └── src/
│           ├── domain/         # Entities (FurnitureConfig)
│           ├── infrastructure/ # API client
│           ├── presentation/   # Screens, components, Zustand store
│           └── shared/         # Theme tokens, Three.js viewer
├── packages/shared/      # Shared types
├── start                 # Dev start script
└── package.json          # npm workspaces
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native 0.81, Expo SDK 54, React 19, Expo Router |
| 3D | Three.js r128 in WebView, PBR materials, procedural wood textures |
| State | Zustand |
| Backend | NestJS 10, TypeScript |
| AI | Gemini 2.5 Flash (Vision API) |

## API

**`POST /api/analyze-photo`**

```json
{ "photo": "base64_encoded_image" }
```

Response:
```json
{
  "style": "modern",
  "dimensions": { "width": 80, "height": 180, "depth": 30 },
  "shelves": 4,
  "material": "carvalho",
  "confidence": 0.92,
  "suggestions": ["Add a vertical divider for wider shelves"]
}
```

## License

All rights reserved. This code is provided for portfolio review and evaluation purposes only. See [LICENSE](LICENSE).
