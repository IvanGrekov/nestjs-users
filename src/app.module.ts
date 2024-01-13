import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { logger, LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
    consumer.apply(logger).exclude('users(.*)').forRoutes('*');
  }
}
