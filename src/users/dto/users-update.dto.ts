import {IsString} from "class-validator";

export class UsersUpdateDto{
    @IsString()
    password: string;

    @IsString()
    name: string;
}