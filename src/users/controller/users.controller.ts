import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import { UsersService } from "../service/users.service";
import {UsersCreateDto} from "../dto/users-create.dto";
import {UsersUpdateDto} from "../dto/users-update.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param() params){
        return await this.usersService.getUserById(params);
    }

    @Post()
    async createUser(@Body() usersCreateDto: UsersCreateDto){
        return await this.usersService.createUser(usersCreateDto);
    }

    @Put(':id')
    async updateUser(@Body() userUpdateDTO: UsersUpdateDto, @Param() params){
        return await this.usersService.updateUser(userUpdateDTO, params);
    };

    @Delete(':id')
    async deleteUser(@Param() params){
        return await this.usersService.deleteUser(params);
    }
}
