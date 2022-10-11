import { Controller, Get } from '@nestjs/common';
import { UsersService } from "../service/users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }
}
