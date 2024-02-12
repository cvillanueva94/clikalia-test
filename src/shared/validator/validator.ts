import { validate } from 'class-validator';
import { GenericError } from '../errors/genericerror';
import { ErrorHelper } from '../errors/errorhelper';

interface IValidateDtoResponse {
  isValid: boolean;
  error?: GenericError;
  dto: any;
}

export async function ValidateDto(dto: any, data: Object): Promise<IValidateDtoResponse> {
  const keys = Object.keys(data);

  keys.forEach(key => {
    dto[key] = data[key];
  });

  const validateResponse = await validate(dto);

  if (validateResponse.length) {
    const formatter = new Intl.ListFormat('es', {
      style: 'long',
      type: 'conjunction'
    });
    const message = `Error de validación en: ${formatter.format(validateResponse.map(item => item.property))}`;

    const validationError = new GenericError(message, 400);

    return { isValid: false, error: validationError, dto };
  }
  return { isValid: true, dto };
}
