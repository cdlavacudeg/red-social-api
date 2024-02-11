import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const swaggerDocumentConfig = new DocumentBuilder().setTitle('Red-Social API').setVersion('1.0').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentConfig);

  SwaggerModule.setup('/documentation', app, swaggerDocument);
  await app.listen(process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000);
}
bootstrap();
