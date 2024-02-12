import { PaginationDto } from '../dtos/pagination.dto';

export interface ICRUDRepository<T> {
  /**
   * Find all entities in the repository.
   * @
   */
  findAll(pagination: PaginationDto): Promise<T[]> | T[];

  /**
   * Find entity by Id
   *
   * @param id
   */
  findByPk(id: string): Promise<T | null>;

  /**
   * Persist an entity in the repository, if an entity exists, update it.
   *
   * @param {T} entity
   * @returns  {(Promise<void> | void)}
   */
  save(t: T): Promise<void> | void;

  /**
   * Update an entity in the repository, if an entity exists, update it.
   *
   * @param {T} entity
   * @returns  {(Promise<void> | void)}
   */
  update(t: T): Promise<void> | void;

  /**
   * Delete an entity in the repository, if an entity exists, delete it.
   * @param {T} entity
   * @returns  {(Promise<boolean> | boolean)}
   */
  delete(id: string): Promise<boolean> | boolean;
}
