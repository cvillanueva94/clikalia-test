import { IGateway } from './IGateway';
import { GatewayPayResponseDto } from '../dto/gateway.pay-response.dto';
import { GatewayPayDto } from '../dto/gateway.pay.dto';
import { GatewayRefundDto } from '../dto/gateway.refund.dto';
import { GatewayRefundResponseDto } from '../dto/gateway.refund-response.dto';
import { GatewayPartialRefundDto } from '../dto/gateway.partial-refund.dto';
import { GatewayPartialRefundResponseDto } from '../dto/gateway.partial-refund-response.dto';

export abstract class AbstractGateway implements IGateway {
  /**
   * Método para realizar el pago
   *
   * @param {GatewayPayDto} dto - the payment data transfer object
   * @return {Promise<GatewayPayResponseDto>} a promise that resolves to the payment response data transfer object
   */
  pay(dto: GatewayPayDto): Promise<GatewayPayResponseDto> {
    throw new Error('Method not implemented.');
  }

  /**
   * Método para realizar reembolsar todo lo que queda del pago
   *
   * @param {GatewayRefundDto} dto - description of parameter
   * @return {Promise<GatewayRefundResponseDto>} description of return value
   */
  reimburse(dto: GatewayRefundDto): Promise<GatewayRefundResponseDto> {
    throw new Error('Method not implemented.');
  }

  /**
   * Método para realizar un reembolso parcial
   *
   * @param {GatewayPartialRefundDto} dto - the data transfer object for the partial reimbursement
   * @return {Promise<GatewayPartialRefundResponseDto>} a Promise that resolves to the response data transfer object
   */
  partialReimburse(dto: GatewayPartialRefundDto): Promise<GatewayPartialRefundResponseDto> {
    throw new Error('Method not implemented.');
  }

  /**
   * Método para obtener el estado
   *
   * @return {boolean} the status
   */
  getStatus(): boolean {
    throw new Error('Method not implemented.');
  }
}
