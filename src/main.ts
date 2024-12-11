import * as morgan from 'morgan';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable morgan for logging HTTP requests
  app.use(morgan('dev'));

  // Apply validation pipes to all requests
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      transform: true, // quitar si es necesario
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Set prefix for API endpoints
  app.setGlobalPrefix('api');

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle('API RESTful')
    .setDescription('API RESTful de pruebas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none', // 'list'
    },
  });

  // Start the server and listen on port
  await app.listen(process.env.PORT);
  console.log(`app in ${await app.getUrl()}`);
}
bootstrap();
