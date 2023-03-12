import { Prop } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

export class BaseSchema implements BaseModel {
  _id: string;
  @Prop({ select: false })
  __v: number;
}
