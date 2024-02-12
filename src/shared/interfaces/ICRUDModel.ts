import { Model } from 'mongoose';

export interface ICRUDModel<T extends Document> extends Model<T> {
  
  findByName(name: string): Promise<T | null>;
}
