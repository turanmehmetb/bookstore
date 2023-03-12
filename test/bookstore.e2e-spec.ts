import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Credentials, Tokens } from 'src/modules/auth/service/auth.service';
import { BookModel } from 'src/modules/book/model/book.model';

const BOOK: Omit<BookModel, '_id'> = {
  // mongo will genereate _id field
  title: 'MyFirstBook',
  author: 'MBT',
  description: 'desc',
  year: 2011,
  cover: 'url',
};

const INVALID_BOOK: Omit<BookModel, '_id'> = {
  title: 'MyFirstBook',
  author: 'MBT',
  description: 'desc',
  year: -1, // invalid field
  cover: 'url',
};

describe('Bookstore', () => {
  let app: INestApplication;
  let credentials: Credentials;
  let tokens: Tokens;
  let books: BookModel[];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET get credentials', async () => {
    const result = await request(app.getHttpServer()).get('/auth/credentials');
    expect(result.status).toEqual(200);
    credentials = result.body;
  });

  it('/GET get tokens', async () => {
    const result = await request(app.getHttpServer())
      .get('/auth/tokens')
      .query({ clientId: credentials.clientId })
      .query({ secretKey: credentials.secretKey });
    expect(result.status).toEqual(200);
    expect(result.body.accessToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, // jwt regex check
    );
    tokens = result.body;
  });

  it(`/GET get books - unauthorized error`, async () => {
    const result = await request(app.getHttpServer()).get('/books');
    expect(result.status).toEqual(401);
  });

  it(`/POST create book`, async () => {
    const result = await request(app.getHttpServer())
      .post('/books')
      .send(BOOK)
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(201);
    expect(result.body.author).toEqual(BOOK.author);
  });

  it(`/POST create book - invalid error`, async () => {
    const result = await request(app.getHttpServer())
      .post('/books')
      .send(INVALID_BOOK)
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(500);
  });

  it(`/GET get books`, async () => {
    const result = await request(app.getHttpServer())
      .get('/books')
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(1);
    books = result.body;
  });

  it(`/GET get book`, async () => {
    const result = await request(app.getHttpServer())
      .get(`/books/${books[0]._id}`)
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(books[0]);
  });

  it(`/PUT update book`, async () => {
    const update = { ...books[0], description: 'new description' };
    const result = await request(app.getHttpServer())
      .put(`/books/${books[0]._id}`)
      .send(update)
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(update);
    books[0] = update;
  });

  it(`/DELETE delete book`, async () => {
    const result = await request(app.getHttpServer())
      .delete(`/books/${books[0]._id}`)
      .set('Authorization', 'bearer ' + tokens.accessToken);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(books[0]);
  });

  it(`/GET refresh token`, async () => {
    const result = await request(app.getHttpServer())
      .get('/auth/refreshTokens')
      .query({ clientId: credentials.clientId })
      .set('Authorization', 'bearer ' + tokens.refreshToken);
    expect(result.status).toEqual(200);
    expect(result.body.accessToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, // jwt regex check
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
