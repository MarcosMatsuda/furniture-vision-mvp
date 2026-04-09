/**
 * Shared Types — used by both mobile app and API
 */

export type FurnitureType = 'wardrobe' | 'closet' | 'bookshelf' | 'rack' | 'desk' | 'cabinet';
export type DoorType = 'sliding' | 'hinged' | 'none';
export type FurnitureStyle = 'modern' | 'classic' | 'industrial' | 'rustic' | 'minimalist';
export type WoodMaterial =
  | 'branco' | 'carvalho' | 'tabaco' | 'preto'
  | 'freijo' | 'nogueira' | 'cinza' | 'amendoa' | 'canela';

export interface FurnitureDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface FurnitureComponents {
  doors: { count: number; type: DoorType; mirror: boolean };
  drawers: number;
  shelves: number;
  hangingRod: boolean;
  niches: number;
}

export interface FurnitureConfig {
  type: FurnitureType;
  style: FurnitureStyle;
  dimensions: FurnitureDimensions;
  components: FurnitureComponents;
  material: WoodMaterial;
}

export interface AnalysisResult {
  type: FurnitureType;
  style: FurnitureStyle;
  doors: { count: number; type: DoorType; mirror: boolean };
  drawers: number;
  shelves: number;
  hangingRod: boolean;
  niches: number;
  material: WoodMaterial;
  confidence: number;
  suggestions: string[];
}

export interface AnalyzePhotoRequest {
  photo: string; // base64
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}
