import { Prop, Schema } from '@nestjs/mongoose';
import { BaseSchema } from '../../../util/base/model/base.schema';
import { BookModel } from './book.model';

@Schema()
export class BookSchema extends BaseSchema implements BookModel {
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
}
