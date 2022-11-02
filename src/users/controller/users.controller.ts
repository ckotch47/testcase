import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UsersService } from "../service/users.service";
import {UsersCreateDto} from "../dto/users-create.dto";
import {UsersUpdateDto} from "../dto/users-update.dto";
import {UsersGet_allResponse} from "../response/users-get_all.response";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<UsersGet_allResponse>  {
        return await this.usersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param() params):Promise<object>{
        return await this.usersService.getUserById(params);
    }

    @Post()
    async createUser(@Body() usersCreateDto: UsersCreateDto):Promise<object>{
        return await this.usersService.createUser(usersCreateDto);
    }

    @Put(':id')
    async updateUser(@Body() userUpdateDTO: UsersUpdateDto, @Param() params): Promise<object | boolean>{
        return await this.usersService.updateUser(userUpdateDTO, params);
    };

    @Delete(':id')
    async deleteUser(@Param() params): Promise<object>{
        return await this.usersService.deleteUser(params);
    }
}
