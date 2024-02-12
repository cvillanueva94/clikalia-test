import { ICRUDDto } from '../interfaces/ICRUDDto';

export abstract class UpdateCrudDto implements ICRUDDto {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}