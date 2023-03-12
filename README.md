<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Simple Bookstore API

## Installation

```bash
$ npm install
```
Requires MongoDB

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# load test (requires loadtest package -> npm install -g loadtest)
$ npm run loadtest
```
## Swagger

Swagger UI can be accessed from http://localhost:3000/api

## Authorization

In order to use API, an access token is needed. clientId and secretKey will be used to retrieve access token. <br/>
Only public endpoint of the API is `auth/credentials` which will provide clientId and secretKey.
```
curl -X 'GET' \
  'http://localhost:3000/auth/credentials' \
  -H 'accept: */*'
```
```
{
  "clientId": "640dda74d185ae28bb7c223e",
  "secretKey": "mjFQtCgFVmuEojikA/YsCQ=="
}
```
By sending these credentials to `auth/tokens` endpoint will return accessToken and refreshToken.
```
curl -X 'GET' \
  'http://localhost:3000/auth/tokens?clientId=640e09d4fc9d6adf44e504be&secretKey=oAKAVmsFIWoR5Jk%2Bkm%2B7gA%3D%3D' \
  -H 'accept: */*'
```
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjY0MGUwOWQ0ZmM5ZDZhZGY0NGU1MDRiZSIsImlhdCI6MTY3ODY0NDQxNCwiZXhwIjoxNjc4NjQ0NDc0fQ.M6N6WQlkf6JE2lmbRkYiOGdngdXVEDXmR1qEiwax8i4",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjY0MGUwOWQ0ZmM5ZDZhZGY0NGU1MDRiZSIsImlhdCI6MTY3ODY0NDQxNCwiZXhwIjoxNjc5MjQ5MjE0fQ.Au9viNVHoBeL5_HASnkaa_dC2upc1wSRQEo4ZhTJ0TY"
}
```
* accessToken will expire after 5 minutes, but it can be refreshed by refreshToken which will expire after 1 week.
* All other endpoints expects accessToken as Authorization Bearer token. Otherwise Unauthorized Exception will occur. Only `auth/refreshTokens` endpoint expects refreshToken.

## Usage

<h3>Bookstore CRUD API</h3>

**Data Model;**
```
  @Prop({ maxlength: 255, required: true })
  title: string;
  @Prop({ maxlength: 2000, required: true })
  description: string;
  @Prop({ maxlength: 255, required: true })
  author: string;
  @Prop({ min: 0, max: new Date().getFullYear(), required: true })
  year: number;
  @Prop({ maxlength: 1000 })
  cover: string;
```
**Methods;**

* GET /books
* GET /books{id}
* POST /books with request body
* PUT /books{id} with request body
* DELETE /books{id} <br/>

**Sample Data;**
```
  title: 'MyFirstBook',
  author: 'MBT',
  description: 'desc',
  year: 2011,
  cover: 'url',
```



