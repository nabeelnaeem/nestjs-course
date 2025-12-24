import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is global validation pipe so that we dont have to repeat this in each controller method
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only properties that are present in dto will be passed
      forbidNonWhitelisted: true, //Forbids the nonwhitelisted properties and throws an error
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
