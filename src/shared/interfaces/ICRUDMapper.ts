import { ICRUDDocument } from './ICRUDDocument';
import { ICRUDDto } from './ICRUDDto';

export interface ICRUDMapper<D extends ICRUDDto, P extends ICRUDDocument, UD extends ICRUDDto> {
  DocumentToDto(pEntity: P): D;
  DtoToDocument(dEntity: D): Partial<P>;
  UpdateDtoToDocument(dEntity: UD, pEntity: P): Partial<P>;
}
