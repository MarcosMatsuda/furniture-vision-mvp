import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  get port(): number {
    return parseInt(process.env.PORT || '3335', 10);
  }

  get geminiApiKey(): string {
    return process.env.GEMINI_API_KEY || '';
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }
}
