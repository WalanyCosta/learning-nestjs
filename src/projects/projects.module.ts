import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes( 
      {path: '/projects', method: RequestMethod.GET})
    .apply(AuthMiddleware).forRoutes({path: '/projects', method: RequestMethod.POST})
  }
}
