import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { BookController } from './controller/book.controller';
import { BookModel } from './model/book.model';
import { BookSchema } from './model/book.schema';
import { BookService } from './service/book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookModel.name,
        collection: 'Books',
        schema: SchemaFactory.createForClass(BookSchema),
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
