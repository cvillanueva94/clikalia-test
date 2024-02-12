import { GatewayPayResponseDto } from 'src/modules/gateway/dto/gateway.pay-response.dto';
import { GatewayPayDto } from 'src/modules/gateway/dto/gateway.pay.dto';

export interface IGateway {
  pay(dto: GatewayPayDto): Promise<GatewayPayResponseDto>;
  reimburse(): Promise<void>;
  partialReimburse(): Promise<void>;
}
