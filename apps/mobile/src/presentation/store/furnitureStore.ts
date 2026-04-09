import { create } from 'zustand';
import {
  FurnitureConfig,
  FurnitureDimensions,
  WoodMaterial,
  PhotoAnalysis,
  DEFAULT_BOOKSHELF_CONFIG,
} from '../../domain/entities';

interface FurnitureState {
  config: FurnitureConfig;
  referencePhotoUri: string | null;
  analysis: PhotoAnalysis | null;
  isAnalyzing: boolean;
  isExporting: boolean;
  analysisError: string | null;

  setConfig: (config: FurnitureConfig) => void;
  setDimension: (key: keyof FurnitureDimensions, value: number) => void;
  setMaterial: (material: WoodMaterial) => void;
  setShelves: (count: number) => void;
  setReferencePhoto: (uri: string) => void;
  setAnalysis: (analysis: PhotoAnalysis) => void;
  setAnalyzing: (loading: boolean) => void;
  setExporting: (loading: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  reset: () => void;
}

export const useFurnitureStore = create<FurnitureState>((set) => ({
  config: DEFAULT_BOOKSHELF_CONFIG,
  referencePhotoUri: null,
  analysis: null,
  isAnalyzing: false,
  isExporting: false,
  analysisError: null,

  setConfig: (config) => set({ config }),
  setDimension: (key, value) =>
    set((state) => ({
      config: { ...state.config, dimensions: { ...state.config.dimensions, [key]: value } },
    })),
  setMaterial: (material) => set((state) => ({ config: { ...state.config, material } })),
  setShelves: (count) => set((state) => ({ config: { ...state.config, shelves: count } })),
  setReferencePhoto: (uri) => set({ referencePhotoUri: uri }),
  setAnalysis: (analysis) => set({ analysis, config: analysis.config }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setExporting: (isExporting) => set({ isExporting }),
  setAnalysisError: (analysisError) => set({ analysisError }),
  reset: () =>
    set({
      config: DEFAULT_BOOKSHELF_CONFIG,
      referencePhotoUri: null,
      analysis: null,
      isAnalyzing: false,
      isExporting: false,
      analysisError: null,
    }),
}));
