import { IsNumber, IsString } from 'class-validator';

export class PayDto {
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
