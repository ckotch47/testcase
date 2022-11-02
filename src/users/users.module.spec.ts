import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from "./users.module";
import {UsersController} from "./controller/users.controller";
import {UsersService} from "./service/users.service";

describe('UsersModule', () => {
    let usersModule: TestingModule;
    let usersController: any;
    let usersService: any
    beforeEach(async () => {
        usersModule = await Test.createTestingModule({
            imports: [UsersModule],
        }).compile();
        usersController = usersModule.get<UsersController>(UsersController);
        usersService = usersModule.get<UsersService>(UsersService)
    });

    it('should validate the users module', () => {
        expect(usersModule).toBeDefined();
        expect(usersService).toBeDefined();
        expect(usersController).toBeDefined()
    });
});