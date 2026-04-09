import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzePhotoDto {
  @IsString()
  @IsNotEmpty()
  photo!: string; // base64 encoded image
}

export interface AnalysisResult {
  style: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  shelves: number;
  material: string;
  confidence: number;
  suggestions: string[];
}
