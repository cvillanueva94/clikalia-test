import { GenericError } from '../../shared/errors/genericerror';
import gateways from './utils/';
import { AbstractGateway } from './common/abstract.gateway';
import { GatewayPayDto } from './dto/gateway.pay.dto';
import { GatewayPayResponseDto } from './dto/gateway.pay-response.dto';
import { GatewayRefundResponseDto } from './dto/gateway.refund-response.dto';
import { GatewayRefundDto } from './dto/gateway.refund.dto';
import { GatewayPartialRefundDto } from './dto/gateway.partial-refund.dto';
import { GatewayPartialRefundResponseDto } from './dto/gateway.partial-refund-response.dto';

export class GatewayService {
  private gateway: AbstractGateway;

  constructor(gatewayType: string) {
    this.gateway = this.getGateway(gatewayType);
  }

  private getGateway(gatewayType: string): AbstractGateway {
    if (!gateways[gatewayType]) {
      throw new GenericError('No existe esa pasarela de pagos', 400);
    }
    return gateways[gatewayType];
  }

  async pay(dto: GatewayPayDto): Promise<GatewayPayResponseDto> {
    return this.gateway.pay(dto);
  }

  async reimburse(dto: GatewayRefundDto): Promise<GatewayRefundResponseDto> {
    return this.gateway.reimburse(dto);
  }

  async partialReimburse(dto: GatewayPartialRefundDto): Promise<GatewayPartialRefundResponseDto> {
    return this.gateway.partialReimburse(dto);
  }

  getStatus(): boolean {
    return this.gateway.getStatus();
  }
}
