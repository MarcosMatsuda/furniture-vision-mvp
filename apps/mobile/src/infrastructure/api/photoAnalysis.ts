import axios from 'axios';
import { PhotoAnalysis, DEFAULT_BOOKSHELF_CONFIG } from '../../domain/entities';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3335';

export async function analyzePhotoWithAI(photoBase64: string): Promise<PhotoAnalysis> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/analyze-photo`,
      { photo: photoBase64 },
      { timeout: 30000 }
    );

    const data = response.data;

    return {
      config: {
        style: data.style || 'modern',
        dimensions: {
          width: data.dimensions?.width ?? 80,
          height: data.dimensions?.height ?? 180,
          depth: data.dimensions?.depth ?? 30,
        },
        shelves: data.shelves ?? 4,
        material: data.material || 'branco',
      },
      confidence: data.confidence ?? 0.7,
      suggestions: data.suggestions ?? [],
    };
  } catch (error: any) {
    const serverMessage = error?.response?.data?.message;
    if (serverMessage) {
      throw new Error(serverMessage);
    }
    throw new Error('Analysis failed. Please try again.');
  }
}
