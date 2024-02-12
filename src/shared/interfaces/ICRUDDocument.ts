import { Document } from 'mongoose';

export interface ICRUDDocument extends Document {
	id: string;
    createdAt: Date;
    updatedAt: Date;
}
