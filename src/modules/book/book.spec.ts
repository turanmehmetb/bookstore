import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './controller/book.controller';
import { BookModel } from './model/book.model';
import { BookService } from './service/book.service';

const BOOKS: BookModel[] = [
  {
    _id: '123',
    title: 'MyFirstBook',
    author: 'MBT',
    description: 'desc',
    year: 2011,
    cover: 'url',
  },
  {
    _id: '1234',
    title: 'MySecondBook',
    author: 'MBT',
    description: 'desc',
    year: 2012,
    cover: 'url',
  },
];

describe('Book', () => {
  let app: TestingModule;
  let bookService: BookService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: 'BookModelModel',
          useValue: {},
        },
      ],
      controllers: [BookController],
    }).compile();

    bookService = app.get(BookService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  describe('Get all', () => {
    it('should get 2 items', async () => {
      jest.spyOn(bookService, 'getAll').mockResolvedValueOnce(BOOKS);
      const result = await bookService.getAll();
      expect(result.length).toEqual(2);
    });
  });

  describe('Get one', () => {
    it('should get first item', async () => {
      jest.spyOn(bookService, 'get').mockResolvedValueOnce(BOOKS[0]);
      const result = await bookService.get('123');
      expect(result).toEqual(BOOKS[0]);
    });
  });

  describe('Create one', () => {
    it('should create and return the item', async () => {
      jest.spyOn(bookService, 'create').mockResolvedValueOnce(BOOKS[0]);
      const result = await bookService.create(BOOKS[0]);
      expect(result).toEqual(BOOKS[0]);
    });
  });

  describe('Update one', () => {
    it('should update and return the item', async () => {
      const update = { ...BOOKS[0], cover: 'newUrl' };
      jest.spyOn(bookService, 'update').mockResolvedValueOnce(update);
      const result = await bookService.update(update._id, update);
      expect(result._id).toEqual(update._id);
      expect(result.cover).toEqual('newUrl');
    });
  });

  describe('Delete one', () => {
    it('should delete and return the item', async () => {
      jest.spyOn(bookService, 'delete').mockResolvedValueOnce(BOOKS[0]);
      const result = await bookService.delete(BOOKS[0]._id);
      expect(result).toEqual(BOOKS[0]);
    });
  });
});
