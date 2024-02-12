import { IsNumber, IsString } from 'class-validator';

export class GatewayPayResponseDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  amount: number;

  @IsString()
  gateway: string;

  @IsString()
  transaction: string;

  constructor() {}
}
