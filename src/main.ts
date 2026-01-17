import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { VersioningType } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const basePath = 'api/users';

  if (process.env.LOG_REQUESTS === 'true') {
    app.use(morgan.default('combined'));
  }

  app.enableCors({
    origin: process.env.ORIGIN_ALLOWED,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
  app.setGlobalPrefix(basePath);

  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('API de gerenciamento de usuários e autenticação')
    .setVersion(process.env.npm_package_version as string)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
