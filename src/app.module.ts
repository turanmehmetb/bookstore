import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { HttpExceptionFilter } from './util/error/httpExceptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bookstore'),
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
