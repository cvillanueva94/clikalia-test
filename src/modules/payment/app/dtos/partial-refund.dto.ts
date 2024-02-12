import { IsNumber, IsString } from 'class-validator';

export class PartialRefundDto {
  @IsString()
  transaction: string;

  @IsNumber()
  amount: number;

  constructor() {}
}
