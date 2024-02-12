import { ICRUDService } from '../interfaces/ICRUDService';
import { CrudDto } from '../dtos/crud.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Repository } from '../repositories/repository';
import { Document } from 'mongoose';
import { ICRUDDocument } from '../interfaces/ICRUDDocument';
import { CrudMapper } from '../models/crud.mapper';
import { GenericError } from '../errors/genericerror';
import httpStatus from 'http-status';
import { UpdateCrudDto } from '../dtos/update-crud.dto';

export class CrudServices<
  Entity extends Document & ICRUDDocument,
  Dto extends CrudDto,
  UpdateDto extends UpdateCrudDto,
  Mapper extends CrudMapper<Entity, Dto, UpdateDto>
> implements ICRUDService<CrudDto, UpdateDto>
{
  private repository: Repository<Entity>;
  private mapper: Mapper;

  constructor(mapper: Mapper, repository: Repository<Entity>) {
    this.mapper = mapper;
    this.repository = repository;
  }

  async list(pagination: PaginationDto): Promise<Dto[]> {
    const objects: Entity[] = await this.repository.findAll(pagination);
    const dtos: Dto[] = objects.map<Dto>(item => this.mapper.DocumentToDto(item));
    return dtos;
  }
  async create(dto: Dto): Promise<string> {
    const feed: Entity = this.mapper.DtoToDocument(dto);
    await this.repository.save(feed);
    return feed.id;
  }
  async update(dto: UpdateDto): Promise<Dto> {
    const originalFeed: Entity = await this.repository.findByPk(dto.id);
    const feed: Entity = this.mapper.UpdateDtoToDocument(dto, originalFeed);
    await this.repository.update(feed);
    const model: Entity = await this.repository.findByPk(feed.id);
    const resultDTO: Dto = this.mapper.DocumentToDto(model);
    return resultDTO;
  }

  async read(id: string): Promise<Dto> {
    const model: Entity = await this.repository.findByPk(id);
    const resultDTO: Dto = this.mapper.DocumentToDto(model);
    return resultDTO;
  }
  async delete(id: string): Promise<void> {
    const isDeleted = await this.repository.delete(id);
    if (!isDeleted) {
      throw new GenericError('Not found', httpStatus.NOT_FOUND);
    }
  }
}
