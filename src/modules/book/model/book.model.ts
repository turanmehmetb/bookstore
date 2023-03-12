import { BaseModel } from '../../../util/base/model/base.model';

export class BookModel extends BaseModel {
  title: string;
  description: string;
  author: string;
  year: number;
  cover: string;
}
