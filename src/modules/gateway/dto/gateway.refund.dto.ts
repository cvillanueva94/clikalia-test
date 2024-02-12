import { IsNumber, IsString } from 'class-validator';

export class GatewayRefundDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  amount: number;

  @IsString()
  transaction: string;

  @IsString()
  gateway: string;

  constructor() {}
}
