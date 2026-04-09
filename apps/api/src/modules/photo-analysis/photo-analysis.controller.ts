import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { PhotoAnalysisService } from './photo-analysis.service';
import { AnalyzePhotoDto, AnalysisResult } from './photo-analysis.dto';

@Controller('api')
export class PhotoAnalysisController {
  private readonly logger = new Logger(PhotoAnalysisController.name);

  constructor(private readonly service: PhotoAnalysisService) {}

  @Post('analyze-photo')
  @HttpCode(HttpStatus.OK)
  async analyzePhoto(@Body() dto: AnalyzePhotoDto): Promise<AnalysisResult> {
    this.logger.log('Analyzing bookshelf photo...');
    const result = await this.service.analyze(dto.photo);
    this.logger.log(`Analysis complete: ${result.shelves} shelves, ${result.material} (${(result.confidence * 100).toFixed(0)}%)`);
    return result;
  }
}
