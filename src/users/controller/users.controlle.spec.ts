import { Test, TestingModule } from '@nestjs/testing';
import { UsersController} from "./users.controller";
import { UsersService} from "../service/users.service";
import '../response/users-get.response'
import {order, product, users} from "../response/users-get.response";

describe('usersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        usersController = app.get<UsersController>(UsersController);
        usersService = app.get<UsersService>(UsersService)
    });

    describe('users controller', () => {
        it('should return users', () => {
            const getUsers_service = jest.spyOn(usersService, "getUsers");
            let temp: any = usersController.getUsers();
            expect(getUsers_service).toBeCalled();

            expect(temp).toEqual({
                massage: 'success',
                status: 200,
                response: {
                    users: expect.any(Array<users>)
                }
            });
            temp.response.users.forEach((user_val: users)=>{
                expect(user_val).toEqual({
                    id: expect.any(Number),
                    name: expect.any(String),
                    surname: expect.any(String),
                    order: expect.any(Array)
                });
                if(user_val.order[0]){
                    user_val.order.forEach((order_val: order)=>{
                        expect(order_val).toEqual({
                            id: expect.any(Number),
                            detail: expect.any(String),
                            product: expect.any(Array<product>)
                        });
                        order_val.product.forEach((product_val: product)=>{
                           expect(product_val).toEqual({
                               id: expect.any(Number),
                               name: expect.any(String)
                           });
                        });
                    });
                }
            });
        });
    });
});
