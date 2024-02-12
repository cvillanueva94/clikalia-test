import { PaginationDto } from '../dtos/pagination.dto';
import { ICRUDDocument } from '../interfaces/ICRUDDocument';
import { Model, Document } from 'mongoose';
import { ICRUDRepository } from '../interfaces/ICRUDRepository';
import { GenericError } from '../errors/genericerror';
import httpStatus from 'http-status';
import { ErrorHelper } from '../errors/errorhelper';

export class Repository<ModelType extends Document & ICRUDDocument> implements ICRUDRepository<ModelType> {
  constructor(private modelInstance: Model<ModelType>) {}

  async findAll(pagination: PaginationDto): Promise<ModelType[]> {
    const dto = await this.modelInstance
      .find(pagination.filter || {})
      .skip(pagination.offset)
      .limit(pagination.limit)
      .exec();
    return dto;
  }

  async findByPk(id: string): Promise<ModelType> {
    const model = await this.modelInstance.findById(id).exec();
    if (!model) {
      throw new GenericError('Model not found', httpStatus.NOT_FOUND);
    }
    return model;
  }

  async save(model: ModelType): Promise<void> {
    try {
      await model.save();
    } catch (e) {
      throw ErrorHelper.mongoDBError(e);
    }
  }

  async update(t: ModelType): Promise<void> {
    await this.modelInstance.findOneAndUpdate({ _id: t.id }, t.toJSON()).exec();
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.modelInstance.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new GenericError('Model not found', httpStatus.NOT_FOUND);
    }
    return result.deletedCount === 1;
  }
}
