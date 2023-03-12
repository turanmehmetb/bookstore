import { Model } from 'mongoose';
import { BaseModel } from '../model/base.model';

export class BaseService<T extends BaseModel> {
  constructor(private readonly model: Model<T>) {}

  get(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  getAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  create(entity: T): Promise<T> {
    const createdModel = new this.model(entity);
    return createdModel.save();
  }

  update(id: string, entity: T): Promise<T> {
    return this.model.findOneAndUpdate({ _id: id }, entity, {
      returnDocument: 'after',
    });
  }

  delete(id: string): Promise<T> {
    return this.model
      .findOneAndDelete({ _id: id }, { returnDocument: 'after' })
      .exec();
  }
}
