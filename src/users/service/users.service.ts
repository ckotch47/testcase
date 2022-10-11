import { Injectable } from '@nestjs/common';
import {UsersEntity} from "../entity/users.entity";

@Injectable()
export class UsersService {
    getUsers(): object {
        return {
            massage: 'success',
            status: 200,
            response: {
                users: UsersEntity.getAll()
            }
        }
    }
}
