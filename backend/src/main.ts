import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CONFIG.CORS);
  await app.listen(CONFIG.PORT);
}
bootstrap();
