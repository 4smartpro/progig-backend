import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  const configService = app.get(ConfigService);
  const logger = new Logger();

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  logger.verbose(`App running at port: ${port}`);
}

bootstrap();
