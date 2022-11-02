import {UsersService} from "./users.service";
import { Test } from '@nestjs/testing';
import {UserEntity} from "../entity/userEntity";
import {UsersCreateDto} from "../dto/users-create.dto";
import {InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {UsersUpdateDto} from "../dto/users-update.dto";


describe('UsersService', () => {
    let usersService: UsersService;
    let userEntity: UserEntity;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: UserEntity,
                    useValue: {
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        Save: jest.fn(),
                        Delete: jest.fn(),
                    }
                },
                UsersService],
        }).compile();
        usersService = module.get(UsersService);
        userEntity = module.get(UserEntity);
    });

    describe('get all users', ()=>{
        it('should return all users', async ()=>{
            const findAll: jest.SpyInstance = jest.spyOn(UserEntity as any,'findAll');
            findAll.mockReturnValue(Promise.resolve([
                {
                    id:'user_id',
                    login: 'user_login',
                    password: 'user_password',
                    name: 'user_name'
                },
                {
                    id: 'user_id1',
                    login: 'user_login2',
                    password: 'user_password3',
                    name: 'user_name4'
                }
            ]));
            let temp = await usersService.getAllUsers();
            expect(temp).toEqual({
                message: 'success',
                result: [
                    {
                        id: 'user_id',
                        login: 'user_login',
                        password: 'user_password',
                        name: 'user_name'
                    },
                    {
                        id: 'user_id1',
                        login: 'user_login2',
                        password: 'user_password3',
                        name: 'user_name4'
                    }]
            });
            expect(findAll).toBeCalled();
        });
    })

    describe('get user by id', ()=>{
        const findById: jest.SpyInstance = jest.spyOn(UserEntity as any, 'findById');
        it('should return user by id', async ()=>{

            findById.mockReturnValue({
                id: 'user_id',
                login: 'user_login',
                password: 'user_password',
                name: 'user_name'
            });
            let temp = await usersService.getUserById({id: 'user_id'});
            expect(temp).toEqual({
                message: 'success',
                result:{
                    id: 'user_id',
                    login: 'user_login',
                    password: 'user_password',
                    name: 'user_name'
                }
            });
            expect(findById).lastCalledWith('user_id');
        });

        it('should return fail user by not id into params', async ()=>{
            let temp = await usersService.getUserById({name: 's'});
            expect(temp).toEqual({
                message: 'not id into payload',
                result: []
            });
        });

        it('should return fail user by id is not string', async ()=>{
            let temp = await usersService.getUserById({id: 101});
            expect(temp).toEqual({
                message: 'id is not string',
                result: []
            });
        });

        it('should return fail user by id is not into base', async ()=>{
            findById.mockReturnValue(undefined);
            let temp = await usersService.getUserById({id: '123'});
            expect(temp).toEqual({
                message: 'not id into base',
                result: []
            });
        });
    });

    describe('create user',  ()=>{
        let saveUser: jest.SpyInstance = jest.spyOn(UserEntity as any, 'Save');
        let newUser:UsersCreateDto = {
            name: 'new_user',
            password: 'password_user',
            login: 'login_user'
        }
        it('should create user', async ()=>{
            saveUser.mockReturnValue({
                id: 'new_id',
                name: 'new_user',
                password: 'password_user',
                login: 'login_user'
            });
            let temp = await usersService.createUser(newUser);
            expect(saveUser).lastCalledWith(newUser);
            expect(temp).toEqual({
                message: 'success',
                result: {
                    id: 'new_id',
                    name: 'new_user',
                    password: 'password_user',
                    login: 'login_user'
                }
            });
        });

        it('should return fail by fail save', async ()=>{
            saveUser.mockImplementation(()=>{
                throw new InternalServerErrorException()
            });
            let temp = await usersService.createUser(newUser);
            expect(temp).toEqual({
                message: 'fail save to entity',
                result: []
            });
        });
    });

    describe('update user',  () => {
        const findById: jest.SpyInstance = jest.spyOn(UserEntity as any, 'findById');
        const saveUser: jest.SpyInstance = jest.spyOn(UserEntity as any, 'Save');
        let updaterUser: UsersUpdateDto = {
            name: 'new_user_name',
            password: 'new_user_password'
        };
        let userToSave = {
            id: 'user_id',
            name: 'user_name',
            password: 'user_password',
            login: 'user_login'
        };
        let userSaved = {
            id: 'user_id',
            name: 'new_user_name',
            password: 'new_user_password',
            login: 'user_login'
        }
        it('should return updated user', async ()=>{
            findById.mockReturnValue(userToSave);
            saveUser.mockReturnValue(userSaved);
           let temp = await usersService.updateUser(updaterUser, 'user_id');
           expect(saveUser).toBeCalledWith(userSaved)
           expect(temp).toEqual(userSaved);
        });

        it('should return false', async ()=>{
           saveUser.mockImplementation(()=>{
               throw new InternalServerErrorException();
           });
           let temp = await usersService.updateUser(updaterUser, 'user_id');
           expect(findById).toBeCalledWith('user_id');
           expect(saveUser).toBeCalledWith(userToSave);
           expect(temp).toBeFalsy();
        });

        it('should return not found exception', async ()=>{
           findById.mockReturnValue(undefined);
           await expect(usersService.updateUser(updaterUser, 'user_id')).rejects.toThrow(NotFoundException);
           expect(findById).toBeCalledWith('user_id');
        });
    });

    describe('delete user',  ()=>{
       const Delete = jest.spyOn(UserEntity as any, 'Delete');
       it('should delete user', async ()=>{
           Delete.mockReturnValue(true);
           let temp = await usersService.deleteUser({id: 'user_id'});
           expect(Delete).toBeCalledWith('user_id');
           expect(temp).toEqual({
              message: 'success',
              result: true
           });
       });

       it('should fail delete user', async () =>{
          Delete.mockReturnValue(undefined);
          let temp = await usersService.deleteUser({id: 'user_id'});
           expect(temp).toEqual({
               message: 'fail',
               result: false
           });
       });
    });

});