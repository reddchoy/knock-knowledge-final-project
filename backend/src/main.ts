import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '1gb' }));
  app.use(bodyParser.urlencoded({ limit: '1gb', extended: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  await app.listen(8080);
}
bootstrap();
