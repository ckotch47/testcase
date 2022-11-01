import { Module } from '@nestjs/common';
import { UsersController } from "./controller/users.controller";
import { UsersService } from "./service/users.service";

import {UserEntity} from "./entity/userEntity";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
