import { IsNumber, IsString } from 'class-validator';
import { ICRUDDto } from 'src/shared/interfaces/ICRUDDto';

export class UpdatePaymentDto implements ICRUDDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  refundedAmount: number;

  @IsString()
  transaction?: string;

  constructor() {}
}
