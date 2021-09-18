import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './common/exception-filters/global.exception-filter';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
console.log('Server is up and running http://localhost:5000/api/v1');
