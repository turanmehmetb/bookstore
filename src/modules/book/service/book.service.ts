import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from '../../../util/base/service/base.service';
import { BookModel } from '../model/book.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService extends BaseService<BookModel> {
  constructor(
    @InjectModel(BookModel.name) private readonly bookModel: Model<BookModel>,
  ) {
    super(bookModel);
  }
}
