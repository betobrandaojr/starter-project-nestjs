import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentLoaderService } from './shared/utils/environment-load.service';
import { Logger } from '@nestjs/common';
import { SwaggerService } from './shared/utils/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentLoaderService = app.get(EnvironmentLoaderService);
  const port = environmentLoaderService.getPort();
  SwaggerService.setup(app);

  await app.listen(port, () => {
    Logger.log(
      `## Application is running on: http://localhost:${port} in profile: ${process.env.NODE_ENV} ##`,
    );
  });
}
bootstrap();
