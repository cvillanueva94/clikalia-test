import { IsNumber, IsString } from 'class-validator';

export class RefundDto {
  @IsString()
  transaction: string;

  constructor() {}
}
