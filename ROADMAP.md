# Furniture Vision MVP — Roadmap

## What We Have (v1.0)

### AI Analysis
- [x] Single photo analysis with Gemini 2.5 Flash Vision
- [x] Bookshelf-only validation (rejects non-bookshelf photos)
- [x] Estimates real dimensions (width, height, depth) from photo
- [x] Detects shelf count and material/color
- [x] Confidence score

### 3D Viewer
- [x] Three.js bookshelf model in WebView
- [x] Procedural wood textures (9 MDF materials)
- [x] PBR lighting with shadow maps
- [x] Orbit controls (drag to rotate, pinch to zoom)
- [x] Auto-adjusts camera distance based on furniture size
- [x] Snapshot export (PNG)

### Mobile App
- [x] Expo SDK 54 + React Native 0.81 + React 19
- [x] HomeScreen with 3 entry points (camera, gallery, manual)
- [x] CameraScreen with photo capture or gallery import
- [x] ConfiguratorScreen with 3D viewer + controls
- [x] Adaptive config panel: dimensions, shelves, material
- [x] Export image via native share sheet
- [x] Zustand state management

### Backend
- [x] NestJS API with single endpoint
- [x] POST /api/analyze-photo (Gemini Vision)
- [x] GET /api/health
- [x] Input validation (class-validator)
- [x] Global exception filter

### DevEx
- [x] `./start` script (ports, env, deps, background API)
- [x] .env.example files with setup instructions
- [x] Clean Architecture (domain/infrastructure/presentation)
- [x] npm workspaces monorepo

---

## What's Next (ideas for future versions)

- [ ] Multiple furniture types (wardrobe, cabinet, rack, desk)
- [ ] Multi-photo analysis (up to 5 angles)
- [ ] AI fallback chain (Groq, Claude)
- [ ] Save/load projects locally
- [ ] Cut list & budget estimation
- [ ] PDF export with 3D snapshot + dimensions
- [ ] AR viewer (iOS Quick Look, Android Scene Viewer)
- [ ] EAS Build for production app
- [ ] Deploy API to Railway/Fly.io
