export interface IError {
  message: string;
  statusCode: number;
  stack?: string;
  name?: string;
}
