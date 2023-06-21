import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { BoomExceptionFilter } from '../src/helper/error-handling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BoomExceptionFilter());

  await app.listen(3000);
}
bootstrap();
