import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseTestModule } from 'src/modules/database/database-test.module';
import * as request from 'supertest';
import { PersonModule } from '../person.module';

let app: INestApplication;
let appRequest: request.SuperTest<request.Test>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [DatabaseTestModule, PersonModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();

  appRequest = request(app.getHttpServer());
});

afterAll(async () => {
  await app.close();
});

describe('Create Person', () => {
  it('/create (POST) - Fail (required field missing)', async () => {
    return await appRequest
      .post('/person/create')
      .send({
        name: 'Testerson da Silva',
      })
      .expect(400);
  });

  it('/create (POST) - Fail (field with wrong type)', async () => {
    return await appRequest
      .post('/person/create')
      .send({
        name: 'Testerson da Silva',
        birthDate: 'Quase no natal, só dois dias antes',
      })
      .expect(400);
  });

  it('/create (POST) - Sucess', async () => {
    await appRequest
      .post('/person/create')
      .send({
        name: 'Testerson da Silva',
        birthDate: '2000-12-21',
      })
      .expect(201);
  });
});
