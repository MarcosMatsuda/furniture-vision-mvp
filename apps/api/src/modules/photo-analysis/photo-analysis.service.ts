import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { AppConfig } from '../../shared/config/app.config';
import { AnalysisResult } from './photo-analysis.dto';

const ANALYSIS_PROMPT = `You are a bookshelf analysis AI. First, determine if the photo shows a bookshelf or shelving unit. If it does NOT show a bookshelf/shelving unit, return:
{"isBookshelf": false}

If it IS a bookshelf/shelving unit, return:
{
  "isBookshelf": true,
  "style": "modern|classic|industrial|rustic|minimalist",
  "dimensions": {
    "width": number_in_cm,
    "height": number_in_cm,
    "depth": number_in_cm
  },
  "shelves": number,
  "material": "branco|carvalho|tabaco|preto|freijo|nogueira|cinza|amendoa|canela",
  "confidence": 0.0-1.0,
  "suggestions": ["suggestion1", "suggestion2"]
}

Return ONLY valid JSON (no markdown, no backticks, no explanation).

What counts as a bookshelf: any open shelving unit, bookcase, display shelf, wall shelf unit, storage shelf rack. It does NOT need to have books — empty shelves count too.

What is NOT a bookshelf: wardrobe, closet, cabinet with doors, desk, table, chair, bed, TV stand, shoe rack.

Rules (only if isBookshelf is true):
- Estimate REAL dimensions in centimeters from photo proportions
- Use common objects for scale: books (~25cm tall), A4 paper (~30cm)
- Typical bookshelf: 60-120cm wide, 80-220cm tall, 25-40cm deep
- Count visible shelves carefully
- Choose the closest material/color match
- Confidence: how sure you are (0.0-1.0)
- Suggestions: 1-3 tips in English about customization`;

@Injectable()
export class PhotoAnalysisService {
  private readonly logger = new Logger(PhotoAnalysisService.name);

  constructor(private readonly config: AppConfig) {}

  async analyze(photoBase64: string): Promise<AnalysisResult> {
    if (this.config.geminiApiKey) {
      try {
        return await this.analyzeWithGemini(photoBase64);
      } catch (error) {
        this.logger.error('Gemini analysis failed:', error);
      }
    }

    return this.defaultResult();
  }

  private async analyzeWithGemini(photoBase64: string): Promise<AnalysisResult> {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.config.geminiApiKey}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              { inline_data: { mime_type: 'image/jpeg', data: photoBase64 } },
              { text: ANALYSIS_PROMPT },
            ],
          },
        ],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
      },
      { headers: { 'Content-Type': 'application/json' }, timeout: 30000 },
    );

    const content = response.data.candidates?.[0]?.content?.parts?.find(
      (p: { text?: string }) => p.text,
    )?.text;

    if (!content) throw new Error('Empty response from Gemini');

    this.logger.log(`Gemini response: ${content.substring(0, 200)}`);
    return this.parseResult(content);
  }

  private parseResult(raw: string): AnalysisResult {
    try {
      const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (parsed.isBookshelf === false) {
        throw new HttpException(
          'This doesn\'t appear to be a bookshelf. Please take a photo of a bookshelf or shelving unit.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        style: this.validateEnum(parsed.style, ['modern', 'classic', 'industrial', 'rustic', 'minimalist'], 'modern'),
        dimensions: {
          width: Math.max(30, Math.min(300, parsed.dimensions?.width ?? 80)),
          height: Math.max(30, Math.min(300, parsed.dimensions?.height ?? 180)),
          depth: Math.max(15, Math.min(60, parsed.dimensions?.depth ?? 30)),
        },
        shelves: Math.max(0, Math.min(12, parsed.shelves ?? 4)),
        material: this.validateEnum(parsed.material, [
          'branco', 'carvalho', 'tabaco', 'preto', 'freijo', 'nogueira', 'cinza', 'amendoa', 'canela',
        ], 'branco'),
        confidence: Math.max(0, Math.min(1, parsed.confidence ?? 0.7)),
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 3) : [],
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error('Failed to parse AI response:', raw);
      throw new HttpException('Failed to parse AI response', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  private validateEnum<T extends string>(value: unknown, allowed: T[], fallback: T): T {
    return typeof value === 'string' && allowed.includes(value as T) ? (value as T) : fallback;
  }

  private defaultResult(): AnalysisResult {
    return {
      style: 'modern',
      dimensions: { width: 80, height: 180, depth: 30 },
      shelves: 4,
      material: 'branco',
      confidence: 0,
      suggestions: ['Could not analyze the photo. Configure manually.'],
    };
  }
}
