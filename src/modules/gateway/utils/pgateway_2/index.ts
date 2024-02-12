import { GatewayPayResponseDto } from '../../dto/gateway.pay-response.dto';
import { GatewayPayDto } from '../../dto/gateway.pay.dto';
import { AbstractGateway } from '../../common/abstract.gateway';
import { v4 } from 'uuid';
import { GatewayRefundDto } from '../../dto/gateway.refund.dto';
import { GatewayRefundResponseDto } from '../../dto/gateway.refund-response.dto';
import { GenericError } from '../../../../shared/errors/genericerror';
import { GatewayPartialRefundResponseDto } from '../../dto/gateway.partial-refund-response.dto';

export class PGateway_2 implements AbstractGateway {
  isEnabled = process.env.PGateway_2_STATUS === 'true' ? true : false;
  async pay(dto: GatewayPayDto): Promise<GatewayPayResponseDto> {
    if (!this.isEnabled) {
      throw new GenericError('Pasarela PGateway_2 deshabilitada.', 400);
    }
    // Aqui iria toda la logica asociada a la pasarela PGateway_2
    // como es solo una simulacion construimos la respuesta

    const responseDto = new GatewayPayResponseDto();
    responseDto.amount = dto.amount;
    responseDto.gateway = dto.gateway;
    responseDto.transaction = v4();

    return responseDto;
  }

  async reimburse(dto: GatewayRefundDto): Promise<GatewayRefundResponseDto> {
    if (!this.isEnabled) {
      throw new GenericError('Pasarela PGateway_2 deshabilitada.', 400);
    }
    // Aqui iria toda la logica asociada a la pasarela PGateway_2
    // como es solo una simulacion construimos la respuesta

    const responseDto = new GatewayRefundResponseDto();
    responseDto.amount = dto.amount;
    responseDto.gateway = dto.gateway;
    responseDto.transaction = dto.transaction;

    return responseDto;
  }

  async partialReimburse(): Promise<GatewayPartialRefundResponseDto> {
    // Lanzamos un error por solicitud de la problematica
    throw new GenericError('La pasarela no permite este tipo de reembolso', 400);
  }

  getStatus(): boolean {
    return process.env.PGateway_2_STATUS === 'true' ? true : false;
  }
}
