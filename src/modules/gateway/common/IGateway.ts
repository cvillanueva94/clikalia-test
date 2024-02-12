import { GatewayPartialRefundResponseDto } from '../dto/gateway.partial-refund-response.dto';
import { GatewayPartialRefundDto } from '../dto/gateway.partial-refund.dto';
import { GatewayPayResponseDto } from '../dto/gateway.pay-response.dto';
import { GatewayPayDto } from '../dto/gateway.pay.dto';
import { GatewayRefundResponseDto } from '../dto/gateway.refund-response.dto';
import { GatewayRefundDto } from '../dto/gateway.refund.dto';

export interface IGateway {
  pay(dto: GatewayPayDto): Promise<GatewayPayResponseDto>;
  reimburse(dto: GatewayRefundDto): Promise<GatewayRefundResponseDto>;
  partialReimburse(dto: GatewayPartialRefundDto): Promise<GatewayPartialRefundResponseDto>;
  getStatus(): boolean;
}
