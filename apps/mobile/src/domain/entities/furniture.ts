/**
 * Domain Entities — Bookshelf configuration
 */

export type FurnitureStyle = 'modern' | 'classic' | 'industrial' | 'rustic' | 'minimalist';
export type WoodMaterial = 'branco' | 'carvalho' | 'tabaco' | 'preto' | 'freijo' | 'nogueira' | 'cinza' | 'amendoa' | 'canela';

export interface FurnitureDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface FurnitureConfig {
  style: FurnitureStyle;
  dimensions: FurnitureDimensions;
  shelves: number;
  material: WoodMaterial;
}

export interface PhotoAnalysis {
  config: FurnitureConfig;
  confidence: number;
  suggestions: string[];
}

export const DEFAULT_BOOKSHELF_CONFIG: FurnitureConfig = {
  style: 'modern',
  dimensions: { width: 80, height: 180, depth: 30 },
  shelves: 4,
  material: 'branco',
};

export const DIMENSION_LIMITS = {
  width: [30, 300] as [number, number],
  height: [30, 300] as [number, number],
  depth: [15, 60] as [number, number],
};
