import Logger from '../../lib/logger';
import httpStatus from 'http-status';
import { GenericError } from './genericerror';

export class ErrorHelper {
  public static processError(error: any): GenericError {
    let result: GenericError;
    if (error instanceof GenericError) {
      result = error;
    } else {
      result = new GenericError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR, error.stack, error.name);
    }
    Logger.error({
      message: result.message,
      stack: result.stack,
      statusCode: result.statusCode,
      name: result.name
    });
    return result;
  }

  public static mongoDBError(error: any): GenericError {
    let result: GenericError;
    if (error.code === 11000) {
      result = new GenericError('The url is already in use', httpStatus.BAD_REQUEST, error.stack, error.name);
    } else if (error._message.includes(' validation failed')) {
      result = new GenericError(error.message, httpStatus.BAD_REQUEST, error.stack, error.name);
    } else {
      result = new GenericError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }
}
