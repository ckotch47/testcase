import {Injectable,  NotFoundException} from '@nestjs/common';
import {UserEntity} from "../entity/userEntity";
import {UsersCreateDto} from "../dto/users-create.dto";
import {UsersUpdateDto} from "../dto/users-update.dto";
import {UsersGet_allResponse} from "../response/users-get_all.response";


@Injectable()
export class UsersService {
    async getAllUsers(): Promise<UsersGet_allResponse> {
        return {
            message: 'success',
            result: await UserEntity.findAll()
        };
    };

    async getUserById(params): Promise<object>{
        if(params.id)
            if(typeof params.id === 'string') {
                let temp: UserEntity = await UserEntity.findById(params.id);
                if (temp)
                    return {
                        message: 'success',
                        result: <UserEntity>temp
                    }
                else
                    return {
                        message: 'not id into base',
                        result: []
                    }
            }else{
                return {
                    message: 'id is not string',
                    result: []
                }
            }
        else
            return {
                message: 'not id into payload',
                result: []
            }
    };

    async createUser(userCreateDTO: UsersCreateDto): Promise<object>{
        let temp = new UserEntity()
        temp.name = userCreateDTO.name;
        temp.password = userCreateDTO.password;
        temp.login = userCreateDTO.login;
        try{
            let tmp: UserEntity = await UserEntity.Save(temp);
            return {
                message: 'success',
                result: tmp
            }
        }catch (e){
            return {
                message: 'fail save to entity',
                result: []
            }
        }
    };

    async updateUser(userUpdateDto: UsersUpdateDto, params): Promise<object | boolean>{
        let temp = await UserEntity.findById(params.id);
        if(temp) {
            if (userUpdateDto.name)
                temp.name = userUpdateDto.name
            if (userUpdateDto.password)
                temp.password = userUpdateDto.password
            try {
                return await UserEntity.Save(temp);
            } catch (e) {
                return false;
            }
        }else{
            throw new NotFoundException();
        }
    };

    async deleteUser(params): Promise<object>{
        if(await UserEntity.Delete(params.id))
            return{
                message: 'success',
                result: true
            }
        else{
            return{
                message: 'fail',
                result: false
            }
        }
    };
}
