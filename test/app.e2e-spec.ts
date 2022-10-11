import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {product, users} from "../src/users/response/users-get.response";

describe('users e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return users', async () => {
    let temp: any =  (await request(app.getHttpServer()).get('/users')).body;
    expect(temp).toEqual({
      massage: 'success',
      status: 200,
      response: {
    users: expect.any(Array<users>)
    }
    });
    expect(temp.response.users[0]).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      surname: expect.any(String),
      order: expect.any(Array)
    });
    if(temp.response.users[0].order[0]){
      expect(temp.response.users[0].order[0]).toEqual({
        id: expect.any(Number),
        detail: expect.any(String),
        product: expect.any(Array<product>)
      });
      expect(temp.response.users[0].order[0].product[0]).toEqual({
        id: expect.any(Number),
        name: expect.any(String)
      });
    }
  });

});
