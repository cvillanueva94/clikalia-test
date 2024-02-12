import {v4} from 'uuid'

import { ICRUDDto } from '../interfaces/ICRUDDto';

export class CrudDto implements ICRUDDto {
    id: string;

    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.id = v4();
        this.createdAt = new Date();
        this.updatedAt = new Date(); 
    }
}