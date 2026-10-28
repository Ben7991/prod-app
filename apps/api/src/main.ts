import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Productivity App')
    .setDescription('Handles all incoming request')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = Number(configService.get('PORT'))

  await app.listen(PORT);
}
await bootstrap();
