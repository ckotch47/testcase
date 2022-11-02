import { Test, TestingModule } from '@nestjs/testing';
import { UsersController} from "./users.controller";
import { UsersService} from "../service/users.service";
import '../response/users-get_all.response'
import {UserEntity} from "../entity/userEntity";
import {InternalServerErrorException, NotFoundException} from "@nestjs/common";

describe('usersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let user_id: string;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        usersController = app.get(UsersController);
        usersService = app.get(UsersService)
    });

    describe('get users', () => {
        it('should return all users', async () => {
            const getUsers_service = jest.spyOn(usersService as any, "getAllUsers");
            let temp: any = await usersController.getAllUsers();
            expect(getUsers_service).toBeCalledTimes(1);
            expect(temp).toEqual({
                message: 'success',
                result: expect.any(Array<UserEntity>)
            });
            if(temp.result.length)
                expect(temp.result.length).toBeGreaterThan(1);
                temp.result.forEach((element)=>{
                    expect(element).toEqual({
                        id: expect.any(String),
                        login: expect.any(String),
                        password: expect.any(String),
                        name: expect.any(String)
                    });
                });
        });

        it('should return user by id', async ()=>{
            const getUserById = jest.spyOn(usersService as any, 'getUserById');
            let temp = await usersController.getUserById({id: '6f0cff6d-02b0-4bc6-8b5e-0d4a39c85eb6'});
            expect(getUserById).toBeCalledWith({id: '6f0cff6d-02b0-4bc6-8b5e-0d4a39c85eb6'});
            expect(temp).toEqual({
                message: 'success',
                result: {
                    id: '6f0cff6d-02b0-4bc6-8b5e-0d4a39c85eb6',
                    login: 'John72@hotmail.com',
                    password: 'tdEYsTP9Y4Tydyi',
                    name: 'Eliseo_Kautzer21'
                }
            });
        });
    });

    describe('create user', ()=>{
        let createUserDto = {
            login: 'user_login',
            password: 'user_password',
            name: 'user_name'
        };
        it('should return new user', async ()=>{
            const createUser = jest.spyOn(usersService as any, 'createUser');
            let temp = await usersController.createUser(createUserDto);
            expect(createUser).lastCalledWith(createUserDto);
            expect(temp).toEqual({
                message: 'success',
                result: {
                    name: 'user_name',
                    password: 'user_password',
                    login: 'user_login',
                    id: expect.any(String)
                }
            });
        });

        it('should fail create user', async ()=>{
            const userSave = jest.spyOn(UserEntity as any, 'Save');
            userSave.mockImplementationOnce(()=>{
                throw new InternalServerErrorException();
            });
            let temp = await usersController.createUser(createUserDto);
            expect(temp).toEqual({
                message: 'fail save to entity',
                result: []
            });
        });
    });

    describe('should update user', () =>{
        let updateUserDto = {
            password: 'user_password',
            name: 'user_name'
        };
        const userSave = jest.spyOn(UserEntity as any, 'Save')
        it('get user for update', async()=>{
            let temp: any = await usersController.getAllUsers();
            user_id = temp.result[0].id;
            expect(user_id).toEqual(expect.any(String));
        });
       it('should update user', async ()=>{
           const updateUser = jest.spyOn(usersService as any, 'updateUser');
           let temp = await usersController.updateUser(updateUserDto, {id: user_id});
           expect(userSave).toBeCalled();
           expect(updateUser).lastCalledWith(updateUserDto, {id: user_id});
           expect(temp).toEqual({
               id: user_id,
               login: 'John72@hotmail.com',
               password: updateUserDto.password,
               name: updateUserDto.name
           });
       });

       it('should fail update user by user not found', async ()=>{
           await expect(usersController.updateUser(updateUserDto, {id: '101'})).rejects.toThrow(NotFoundException);
       });

       it('should return false update user', async ()=>{
           userSave.mockImplementationOnce(()=>{
               throw new InternalServerErrorException();
           });
          let temp = await usersController.updateUser(updateUserDto, {id: user_id});
          expect(temp).toBeFalsy();
       });
    });

    describe('should delete user', ()=>{
        it('should delete user', async ()=>{
            const userDelete = jest.spyOn(usersService as any, 'deleteUser');
            let temp = await usersController.deleteUser({id: user_id});
            expect(userDelete).toBeCalledWith({id: user_id});
            expect(temp).toEqual({
                message: 'success',
                result: true
            });
        });

        it('should failed delete user', async ()=>{
            const userDelete = jest.spyOn(usersService as any, 'deleteUser');
            userDelete.mockReturnValue(false);
            let temp = await usersController.deleteUser({id: user_id});
            expect(temp).toBeFalsy();
        });

        it('check delete users', async ()=>{
           let temp = await usersController.getUserById({id: user_id})
           expect(temp).toEqual({
               message: 'not id into base',
               result: []
           });
        });
    });
});
