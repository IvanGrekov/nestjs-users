import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { EverythingExceptionFilter } from './everything-exception.filter';
import { HttpExceptionFilter } from './http-exception.filter';

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
