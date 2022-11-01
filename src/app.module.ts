import { Module } from '@nestjs/common';
import {UsersController} from "./users/controller/users.controller";
import {UsersService} from "./users/service/users.service";
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      UsersModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
