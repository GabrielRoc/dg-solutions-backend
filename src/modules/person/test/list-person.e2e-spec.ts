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

describe('List Person Item', () => {
  it('/list (GET) - Sucess', async () => {
    return await appRequest
      .get('/person/list')
      .expect((res) => {
        expect(res.body.data).toStrictEqual([]);
      })
      .expect(200);
  });

  it('/list (GET) - Sucess (with pagination params)', async () => {
    for (let i = 0; i < 13; i++) {
      await appRequest
        .post('/person/create')
        .send({
          name: `Teste ${i}`,
          birthDate: new Date(),
        })
        .expect(201);
    }

    return await appRequest
      .get('/person/list')
      .query({
        page: 3,
        limit: 5,
      })
      .expect((res) => {
        expect(res.body.data.length).toBe(3);
      })
      .expect(200);
  });
  2;

  it('/list (GET) - Fail (invalid pagination params)', async () => {
    return await appRequest
      .get('/person/list')
      .query({
        page: 0,
        limit: 1,
      })
      .expect(400);
  });
});
