import { IsNumber, IsString } from 'class-validator';

export class GatewayPayDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  amount: number;

  @IsString()
  gateway: string;

  constructor() {}
}
