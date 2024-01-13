import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { EverythingExceptionFilter } from './exception-filters/everything-exception.filter';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new EverythingExceptionFilter(httpAdapter),
    new HttpExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
