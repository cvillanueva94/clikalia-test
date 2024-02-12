import { v4 } from 'uuid';
import { IDomainEntity } from '../interfaces/IDomainEntity';

export class DomainEntity<T> implements IDomainEntity {
  _id: string;
  props: T;
  public constructor(props: T, id?: string) {
    this._id = id ?? v4();
    this.props = props;
  }

  get id() {
    return this._id;
  }
}
