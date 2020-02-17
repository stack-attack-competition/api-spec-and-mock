import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '../src/users/user';
import { UsersModule } from '../src/users/users.module';

describe.only('users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return [] when there are no users - /users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });

  it('should be able to create new users - /users (POST)', () => {
    const newUser = User.getMockOne(true);
    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(200)
      .expect(user);
  });
});
