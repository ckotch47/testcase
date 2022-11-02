import {UserEntity} from "../entity/userEntity";

export interface UsersGetResponse{
    message: string,
    result: UserEntity
}