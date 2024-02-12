import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Document } from 'mongoose';
import { PaginationDto } from '../dtos/pagination.dto';
import { ErrorHelper } from '../errors/errorhelper';
import { GenericError } from '../errors/genericerror';
import { ICRUDController } from '../interfaces/ICRUDController';
import { CrudServices } from '../services/crud.service';
import { ICRUDDocument } from '../interfaces/ICRUDDocument';
import { CrudDto } from '../dtos/crud.dto';
import { UpdateCrudDto } from '../dtos/update-crud.dto';
import { CrudMapper } from '../models/crud.mapper';

export class CRUDController<
  Entity extends Document & ICRUDDocument,
  Dto extends CrudDto,
  UpdateDto extends UpdateCrudDto,
  Mapper extends CrudMapper<Entity, Dto, UpdateDto>,
  Service extends CrudServices<Entity, Dto, UpdateDto, Mapper>
> implements ICRUDController
{
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const pagination: PaginationDto = {
        limit: Number(req.query.limit || 10),
        offset: Number(req.query.offset || 0),
        filter: Object(req.query.filter)
      };
      const payload = await this.service.list(pagination);
      res.status(httpStatus.OK).send(payload);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      await this.service.create(req.body);
      res.status(httpStatus.CREATED).send();
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      await this.service.update(req.body);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async read(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.read(req.params.id);
      res.status(httpStatus.OK).send(result);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.delete(req.params.id);
      res.status(httpStatus.NO_CONTENT).send(result);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }
}
