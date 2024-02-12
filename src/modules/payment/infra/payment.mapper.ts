import { CrudMapper } from '../../../shared/models/crud.mapper';
import { NewPaymentDto } from '../app/dtos/new-payment.dto';
import { UpdatePaymentDto } from '../app/dtos/update-payment.dto';
import PaymentModel, { PaymentDocument } from './payment.document';

export class PaymentMapper extends CrudMapper<PaymentDocument, NewPaymentDto, UpdatePaymentDto> {
  /**
   * Converts a PaymentDocument object to a NewPaymentDto object.
   *
   * @param {PaymentDocument} PaymentDocument - The PaymentDocument object to be converted.
   * @return {NewPaymentDto} The converted NewPaymentDto object.
   */
  DocumentToDto(paymentDocument: PaymentDocument): NewPaymentDto {
    const { id, amountPaid, transaction, gateway, createdAt, updatedAt } = paymentDocument;
    const dto = new NewPaymentDto();
    dto.id = id;
    dto.amountPaid = amountPaid;
    dto.transaction = transaction;
    dto.gateway = gateway;
    dto.createdAt = createdAt;
    dto.updatedAt = updatedAt;
    return dto;
  }

  /**
   * Converts a NewPaymentDto object to a PaymentDocument object.
   *
   * @param {NewPaymentDto} NewPaymentDto - The NewPaymentDto object to be converted.
   * @return {PaymentDocument} The converted PaymentDocument object.
   */
  DtoToDocument(newPaymentDto: NewPaymentDto): PaymentDocument {
    const payment = new PaymentModel();

    payment.amountPaid = newPaymentDto.amountPaid;
    payment.transaction = newPaymentDto.transaction;
    payment.gateway = newPaymentDto.gateway;

    payment.createdAt = newPaymentDto.createdAt || new Date();
    payment.updatedAt = newPaymentDto.updatedAt || new Date();

    return payment;
  }

  /**
   * Updates the properties of a PaymentDocument based on the values provided in an UpdatenewPaymentDto.
   *
   * @param {UpdateNewPaymentDto} updateNewPaymentDto - The DTO containing the updated values for the news paper.
   * @param {PaymentDocument} originalPayment - The original PaymentDocument object.
   * @return {PaymentDocument} - The updated PaymentDocument object.
   */
  UpdateDtoToDocument(updateNewPaymentDto: UpdatePaymentDto, originalPayment: PaymentDocument): PaymentDocument {
    const payment = new PaymentModel();

    payment.id = originalPayment.id;
    payment.amountPaid = originalPayment.amountPaid;
    payment.createdAt = originalPayment.createdAt;
    payment.gateway = originalPayment.gateway;

    payment.updatedAt = updateNewPaymentDto.updatedAt || new Date();
    payment.refundedAmount = updateNewPaymentDto.refundedAmount;
    payment.transaction = updateNewPaymentDto.transaction;

    return payment;
  }
}
