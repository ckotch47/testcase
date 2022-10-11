import {UsersService} from "./users.service";
import { Test } from '@nestjs/testing';

describe('UsersService', () => {
    let usersService: UsersService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();
        usersService = module.get<UsersService>(UsersService);
    });
    it('getAll', ()=>{
        console.log(usersService.getUsers())
    });
});