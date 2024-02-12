import { IError } from '../interfaces/IError';

export class GenericError implements IError {
  message: string;
  statusCode: number;
  stack?: string | undefined;
  name?: string | undefined;

  constructor(message: string, statusCode: number, stack?: string | undefined, name?: string | undefined) {
    this.message = message;
    this.statusCode = statusCode;
    this.stack = stack;
    this.name = name;
  }
}
