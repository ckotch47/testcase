import {IsString} from "class-validator";

export class UsersCreateDto{
    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
}