import { Document } from 'mongoose';
import { CrudDto } from '../dtos/crud.dto';
import { ICRUDDocument } from '../interfaces/ICRUDDocument';
import { ICRUDMapper } from '../interfaces/ICRUDMapper';
import { UpdateCrudDto } from '../dtos/update-crud.dto';

export abstract class CrudMapper<
  Entity extends Document & ICRUDDocument,
  Dto extends CrudDto,
  UpdateDto extends UpdateCrudDto
> implements ICRUDMapper<Dto, Entity, UpdateDto>
{
  /**
   * Converts a Document object to a Dto object.
   *
   * @param {Entity} entity - The Entity object to be converted.
   * @return {Dto} The converted Dto object.
   */
  abstract DocumentToDto(entity: Entity): Dto;

  /**
   * Converts a Dto object to a Document object.
   *
   * @param {Dto} dto - The Dto object to be converted.
   * @return {Entity} The converted Document object.
   */
  abstract DtoToDocument(dto: Dto): Entity;

  /**
   * Updates the properties of a Document based on the values provided in an UpdateDto.
   *
   * @param {Dto} dto - The DTO containing the updated values for the document.
   * @param {Entity} entity - The original Document object.
   * @return {Entity} - The updated Document object.
   */
  abstract UpdateDtoToDocument(dto: UpdateDto, entity: Entity): Entity;
}
