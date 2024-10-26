import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { Logger } from '@nestjs/common';
import { SwaggerService } from './shared/utils/swagger.service';
import * as dotenv from 'dotenv';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
  });
  const environmentLoaderService = app.get(EnvironmentLoaderService);
  const port = environmentLoaderService.getPort();
  SwaggerService.setup(app);

  await app.listen({ port }, (err, address) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.log(
      `## Application is running on: ${address} in profile: ${process.env.NODE_ENV} ##`,
    );
  });
}
bootstrap();
