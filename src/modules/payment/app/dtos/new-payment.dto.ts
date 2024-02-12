import { IsNumber, IsString } from 'class-validator';
import { ICRUDDto } from 'src/shared/interfaces/ICRUDDto';

export class NewPaymentDto implements ICRUDDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2
  })
  amountPaid: number;

  @IsString()
  gateway: string;

  transaction?: string;

  constructor() {}
}
