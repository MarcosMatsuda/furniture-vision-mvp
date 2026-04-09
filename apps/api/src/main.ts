import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // CORS — allow mobile app
  app.enableCors({
    origin: '*', // MVP: allow all. Production: restrict to app bundle
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Body size limit (photos can be large base64)
  app.use(require('express').json({ limit: '10mb' }));

  const port = parseInt(process.env.PORT || '3335', 10);
  await app.listen(port);

  logger.log(`Furniture Vision API running on http://localhost:${port}`);
  logger.log(`Health check: http://localhost:${port}/api/health`);
  logger.log(`Photo analysis: POST http://localhost:${port}/api/analyze-photo`);
}

bootstrap();
