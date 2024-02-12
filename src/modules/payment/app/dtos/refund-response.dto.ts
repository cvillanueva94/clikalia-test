import { IsNumber, IsString } from 'class-validator';

export class RefundResponseDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  amount: number;

  @IsString()
  transaction: string;

  constructor() {}
}
