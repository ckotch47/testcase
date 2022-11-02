import {UserEntity} from "../entity/userEntity";

export interface UsersCreateResponse{
    message: string,
    result: UserEntity
}