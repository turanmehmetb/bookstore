import { Controller } from '@nestjs/common';
import { BaseController } from '../../../util/base/controller/base.controller';
import { BookModel } from '../model/book.model';
import { BookService } from '../service/book.service';

@Controller('books')
export class BookController extends BaseController<BookModel> {
  constructor(private readonly bookService: BookService) {
    super(bookService);
  }
}
