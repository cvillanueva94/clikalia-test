import { GatewayPayDto } from '../../../gateway/dto/gateway.pay.dto';
import { GatewayService } from '../../../gateway/gateway.service';
import { PaymentRepository } from '../../infra/payment.repository';
import { NewPaymentDto } from '../dtos/new-payment.dto';
import { PayResponseDto } from '../dtos/pay-response.dto';
import { PayDto } from '../dtos/pay.dto';
import paymentModel, { PaymentDocument } from '../../infra/payment.document';

import { PaymentMapper } from '../../infra/payment.mapper';
import { CrudServices } from '../../../../shared/services/crud.service';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { RefundDto } from '../dtos/refund.dto';
import { GatewayRefundDto } from '../../../gateway/dto/gateway.refund.dto';
import { RefundResponseDto } from '../dtos/refund-response.dto';
import { GenericError } from '../../../../shared/errors/genericerror';
import { PartialRefundDto } from '../dtos/partial-refund.dto';
import { PartialRefundResponseDto } from '../dtos/partial-refund-response.dto';
import { GatewayPartialRefundDto } from '../../../gateway/dto/gateway.partial-refund.dto';

export class PaymentService extends CrudServices<PaymentDocument, NewPaymentDto, UpdatePaymentDto, PaymentMapper> {
  private static service: PaymentService;
  private repo: PaymentRepository;

  constructor() {
    const repository = new PaymentRepository(paymentModel);
    super(new PaymentMapper(), repository);
    this.repo = repository;
  }

  static getInstance(): PaymentService {
    if (this.service) return this.service;
    this.service = new PaymentService();
    return this.service;
  }

  async pay(dto: PayDto): Promise<PayResponseDto> {
    // construimos el dto para ir al servicio de pasarelas
    const payDto = new GatewayPayDto();
    payDto.amount = dto.amount;
    payDto.gateway = dto.gateway;

    // llamamos al serivico de pasarelas
    const gatewayService = new GatewayService(dto.gateway);
    const gatewayResponse = await gatewayService.pay(payDto);

    // aqui usamos las funciones del servicio para crear la instancia en bd
    const newPaymentDto = new NewPaymentDto();
    newPaymentDto.amountPaid = gatewayResponse.amount;
    newPaymentDto.gateway = gatewayResponse.gateway;
    newPaymentDto.transaction = gatewayResponse.transaction;

    await super.create(newPaymentDto);

    // Aqui mapeariamos la respuesta de este servicio
    const gatewayResponseDto = new PayResponseDto();
    gatewayResponseDto.amount = gatewayResponse.amount;
    gatewayResponseDto.gateway = gatewayResponse.gateway;
    gatewayResponseDto.transaction = gatewayResponse.transaction;

    return gatewayResponseDto;
  }

  async refund(dto: RefundDto): Promise<RefundResponseDto> {
    // Como haremos un reembolso buscamos el pago original
    const payment = await this.repo.findByTransaction(dto.transaction);

    const refundedAmount = payment.refundedAmount || 0;

    if (payment.amountPaid <= refundedAmount) {
      throw new GenericError('Está intentando reembolsar un monto mayor al pagado', 400);
    }

    // construimos el dto para ir al servicio de pasarelas
    const refundDto = new GatewayRefundDto();
    refundDto.amount = payment.amountPaid + refundedAmount;
    refundDto.transaction = dto.transaction;
    refundDto.gateway = payment.gateway;

    // llamamos al serivico de pasarelas
    const gatewayService = new GatewayService(refundDto.gateway);
    const gatewayResponse = await gatewayService.reimburse(refundDto);

    //
    const updateDto = new UpdatePaymentDto();
    updateDto.refundedAmount = payment.amountPaid + refundedAmount;
    updateDto.id = payment.id;

    await super.update(updateDto);

    // Aqui mapeariamos la respuesta de este servicio
    const gatewayResponseDto = new RefundResponseDto();
    gatewayResponseDto.amount = gatewayResponse.amount;
    gatewayResponseDto.transaction = gatewayResponse.transaction;

    return gatewayResponseDto;
  }

  async partialRefund(dto: PartialRefundDto): Promise<PartialRefundResponseDto> {
    // Como haremos un reembolso buscamos el pago original
    const payment = await this.repo.findByTransaction(dto.transaction);

    if (dto.amount === 0) {
      throw new GenericError('Imposible reembolsar un monto de 0', 400);
    }

    const refundedAmount = (payment.refundedAmount || 0) + dto.amount;

    if (payment.amountPaid < refundedAmount) {
      throw new GenericError('Está intentando reembolsar un monto mayor al pagado', 400);
    }

    // construimos el dto para ir al servicio de pasarelas
    const refundDto = new GatewayPartialRefundDto();
    refundDto.amount = refundedAmount;
    refundDto.transaction = dto.transaction;
    refundDto.gateway = payment.gateway;

    // llamamos al serivico de pasarelas
    const gatewayService = new GatewayService(refundDto.gateway);
    const gatewayResponse = await gatewayService.partialReimburse(refundDto);

    //
    const updateDto = new UpdatePaymentDto();
    updateDto.refundedAmount = refundedAmount;
    updateDto.id = payment.id;

    await super.update(updateDto);

    // Aqui mapeariamos la respuesta de este servicio
    const gatewayResponseDto = new PartialRefundResponseDto();
    gatewayResponseDto.amount = gatewayResponse.amount;
    gatewayResponseDto.transaction = gatewayResponse.transaction;

    return gatewayResponseDto;
  }
}
