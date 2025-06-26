import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
