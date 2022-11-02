import { NestFactory } from '@nestjs/core';
import { UsersModule } from "./users/users.module";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3009);
}
bootstrap();
