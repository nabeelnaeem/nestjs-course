import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is global validation pipe so that we dont have to repeat this in each controller method
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only properties that are present in dto will be passed
      forbidNonWhitelisted: true, //Forbids the nonwhitelisted properties and throws an error
      transform: true, //Transforms the incoming req to an instance of DTO class after validation
    }),
  );
  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS Masterclass - Blog App API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'LinkToMIT')
    .addServer('http://localhost:3000')
    .setVersion('1.1')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
