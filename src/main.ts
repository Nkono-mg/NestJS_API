import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //config global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //config swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS tutoriel')
    .setVersion('1.0')
    .setDescription('API URL is: http://localhost:4200/')
    .setTermsOfService('Voici le terme de service')
    .setLicense('MIT Licence', "url vers la licence de l'application")
    .addServer('http://localhost:4200/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT!);
}
bootstrap();
