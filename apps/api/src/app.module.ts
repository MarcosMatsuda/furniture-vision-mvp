import { Module } from '@nestjs/common';
import { PhotoAnalysisModule } from './modules/photo-analysis/photo-analysis.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [PhotoAnalysisModule, HealthModule],
})
export class AppModule {}
