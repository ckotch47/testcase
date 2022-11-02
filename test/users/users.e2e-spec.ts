import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import supertest from "supertest";
import {CreateAppTesting} from "../common/app.create";
import {UserEntity} from "../../src/users/entity/userEntity";
import {UsersGet_allResponse} from "../../src/users/response/users-get_all.response";
import {UsersGetResponse} from "../../src/users/response/users-get.response";
import {UsersCreateResponse} from "../../src/users/response/users-create.response";
import {UsersDeleteResponse} from "../../src/users/response/users-delete.response";
import {UsersNot_foundResponse} from "../../src/users/response/users-not_found.response";



function expectUserEntity(body: UserEntity): void{
  expect(body).toEqual({
    id: expect.any(String),
    login: expect.any(String),
    name: expect.any(String),
    password: expect.any(String)
  });
}

describe('users e2e', () => {
  let app: INestApplication;
  let req: supertest.SuperTest<supertest.Test>;
  let res: request.Response;
  let newUserId: String;
  let newUserCreate = {
    login: 'user_login',
    password: 'user_password',
    name: 'user_name'
  }
  beforeAll(async () => {
    app = await CreateAppTesting.createApp();
    await app.init();
    req = request(app.getHttpServer());
  });

  afterAll(async ()=>{
    await app.close();
  });

  describe('get users',  ()=>{
    let user_id = '6f0cff6d-02b0-4bc6-8b5e-0d4a39c85eb6';
    it('should return all users', async ()=>{
      res = await req.get('/users');
      let body: UsersGet_allResponse = res.body;
      expect(body).toEqual({
        message: 'success',
        result: expect.any(Array<UserEntity>)
      });
      expectUserEntity(body.result[0]);
    });

    it('should return user by id', async ()=>{
      res = await req.get(`/users/${user_id}`);
      let body:UsersGetResponse = res.body;
      expect(body).toEqual({
        message: 'success',
        result: expect.any(Object)
      })
      expectUserEntity(body.result);
    });
  });

  describe('create user', ()=>{

    it('should create user', async ()=>{
      res = await req
          .post(`/users`)
          .send(newUserCreate);

      let body: UsersCreateResponse = res.body;
      newUserId = body.result.id;

      expect(body).toEqual({
        message: 'success',
        result: expect.any(Object)
      });
      expectUserEntity(body.result);
      expect(body.result).toEqual({
        name: newUserCreate.name,
        password: newUserCreate.password,
        login: newUserCreate.login,
        id: newUserId
      });
    });

    it('should fail create user', async ()=>{
      res = await req
          .post(`/users`)
          .send({

          });
      let body: object = res.body;

      expect(body).toEqual({
        statusCode: 400,
        message: ['login must be a string', 'password must be a string', 'name must be a string' ],
        error: 'Bad Request'
      });
    });
  });

  describe('should update user',  ()=>{
    let updateUser = {
      name: 'new_user_name',
      password: 'new_user_password'
    }
    it('test', async ()=>{
      res = await req
          .put(`/users/${newUserId}`)
          .send(updateUser);
      let body: UserEntity = res.body;
      expectUserEntity(body);
      expect(body).toEqual({
        name: updateUser.name,
        password: updateUser.password,
        login: newUserCreate.login,
        id: newUserId
      });
    });

    it('should fail update user by not found into vase', async ()=>{
      res = await req
          .put(`/users/101`)
          .send(updateUser);
      let body: UsersNot_foundResponse = res.body;
      expect(body).toEqual({
        statusCode: 404,
        message: 'Not Found'
      });
    });
  });


  describe('delete user', ()=>{
    it('should delete new user', async ()=>{
      res = await req.delete(`/users/${newUserId}`)
      let body: UsersDeleteResponse = res.body;
      expect(body).toEqual({
        message: 'success',
        result: true
      });
    });

    it('should fail delete user', async ()=>{
      res = await req.delete(`/users/${newUserId}`);
      let body: UsersDeleteResponse = res.body;
      expect(body).toEqual({
        message: 'fail',
        result: false
      });
    });

    it('check delete user', async ()=>{
      res = await req.get(`/users/${newUserId}`);
      let body:UsersGetResponse = res.body;
      expect(body).toEqual({
        message: 'not id into base',
        result: []
      });
    });
  });
});
