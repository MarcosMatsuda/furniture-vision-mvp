import { Module } from '@nestjs/common';
import { PhotoAnalysisController } from './photo-analysis.controller';
import { PhotoAnalysisService } from './photo-analysis.service';
import { AppConfig } from '../../shared/config/app.config';

@Module({
  controllers: [PhotoAnalysisController],
  providers: [PhotoAnalysisService, AppConfig],
  exports: [PhotoAnalysisService],
})
export class PhotoAnalysisModule {}
