import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve the Svelte app files
  app.use(express.static(join(__dirname, '..', 'client', 'public')));

  // Define the /api prefix for NestJS routes
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
