import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaymentService } from '../services/payment.service';
import { GenericError } from '../../../../shared/errors/genericerror';
import { ErrorHelper } from '../../../../shared/errors/errorhelper';
import { NewPaymentDto } from '../dtos/new-payment.dto';
import { ValidateDto } from '../../../../shared/validator/validator';
import { PayDto } from '../dtos/pay.dto';
import { RefundDto } from '../dtos/refund.dto';
import { PartialRefundDto } from '../dtos/partial-refund.dto';

export class PaymentController {
  paymentService: PaymentService;
  constructor() {
    this.paymentService = PaymentService.getInstance();
  }

  async pay(req: Request, res: Response): Promise<void> {
    try {
      const dto = new PayDto();

      const responseValidate = await ValidateDto(dto, req.body);

      if (!responseValidate.isValid) {
        throw responseValidate.error;
      }

      const response = await this.paymentService.pay(dto);

      res.status(httpStatus.OK).json(response);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async refund(req: Request, res: Response): Promise<void> {
    try {
      const dto = new RefundDto();

      const responseValidate = await ValidateDto(dto, req.body);

      if (!responseValidate.isValid) {
        throw responseValidate.error;
      }

      const response = await this.paymentService.refund(dto);

      res.status(httpStatus.OK).json(response);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }

  async partialRefund(req: Request, res: Response): Promise<void> {
    try {
      const dto = new PartialRefundDto();

      const responseValidate = await ValidateDto(dto, req.body);

      if (!responseValidate.isValid) {
        throw responseValidate.error;
      }

      const response = await this.paymentService.partialRefund(dto);

      res.status(httpStatus.OK).json(response);
    } catch (e) {
      const error: GenericError = ErrorHelper.processError(e);
      res.status(error.statusCode).send(error.message);
    }
  }
}
