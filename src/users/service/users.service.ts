import { Injectable } from '@nestjs/common';
import {UserEntity} from "../entity/userEntity";
import {UsersCreateDto} from "../dto/users-create.dto";
import {UsersUpdateDto} from "../dto/users-update.dto";


@Injectable()
export class UsersService {
    async getAllUsers(): Promise<object> {
        return {
            message: 'success',
            result: await UserEntity.findAll()
        };
    };

    async getUserById(params): Promise<object>{
        if(params.id)
            if(typeof params.id === 'string') {
                let temp = await UserEntity.findById(params.id);
                if (temp)
                    return {
                        message: 'success',
                        result: temp
                    }
                else
                    return {
                        message: 'not id into base',
                        result: []
                    }
            }
    };

    async createUser(userCreateDTO: UsersCreateDto){
        let temp = new UserEntity()
        if(!userCreateDTO || !userCreateDTO.name || !userCreateDTO.login || !userCreateDTO.password)
            return {
                massage: 'fail, not body',
                result: []
            }
        temp.name = userCreateDTO.name;
        temp.password = userCreateDTO.password;
        temp.login = userCreateDTO.login;
        try{
            let tmp = await UserEntity.Save(temp);
            return {
                massage: 'success',
                result: tmp
            }
        }catch (e){
            return {
                massage: 'fail save to entity',
                result: []
            }
        }
    };

    async updateUser(userUpdateDto: UsersUpdateDto, params){
        if(!userUpdateDto || !userUpdateDto.name || !userUpdateDto.password)
            return {
                massage: 'false',
                result: []
            }
        let temp = await UserEntity.findById(params.id);
        if(userUpdateDto.name)
            temp.name = userUpdateDto.name
        if(userUpdateDto.password)
            temp.password = userUpdateDto.password
        return await UserEntity.Save(temp);
    };

    async deleteUser(params){
        if(!params.id || typeof params.id !== "string")
            return {
                massage: 'false',
                result: []
            }
        if(await UserEntity.Delete(params.id))
            return{
                massage: 'success',
                result: true
            }
    }
}
