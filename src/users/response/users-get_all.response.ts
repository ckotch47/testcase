import {UserEntity} from "../entity/userEntity";

export interface UsersGet_allResponse{
    message: string,
    result: UserEntity[]
}