import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Título da API')
      .setDescription('[Collection Json](/api-docs-json)')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api-docs', app, document);

    app.use('/api-docs-json', (req, res) => {
      res.header('Content-Type', 'application/json');
      res.send(document);
    });
  }
}