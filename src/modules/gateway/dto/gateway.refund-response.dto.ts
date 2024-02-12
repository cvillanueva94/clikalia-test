import { IsNumber, IsString } from 'class-validator';

export class GatewayRefundResponseDto {
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
