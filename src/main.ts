import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentLoaderService } from './shared/infra/utils/environment-load.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const environmentLoaderService = app.get(EnvironmentLoaderService);
  const port = environmentLoaderService.getPort();

  await app.listen(port, () => {
    Logger.log(
      `## Application is running on: http://localhost:${port} in profile: ${process.env.NODE_ENV} ##`,
    );
  });
}
bootstrap();
