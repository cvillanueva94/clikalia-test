import { IDomainEntity } from './IDomainEntity';

export interface DtoConstructor<Dto> {
  new (...args: unknown[]): Dto;
}

export abstract class DtoMapper<D extends IDomainEntity, Dto> {
  abstract ToDomain(dto: Dto): D;
}

export interface StaticDtoMapper<D extends IDomainEntity, Dto> {
  new (...args): Dto;

  ToDomain(dto: Dto): D;
}
