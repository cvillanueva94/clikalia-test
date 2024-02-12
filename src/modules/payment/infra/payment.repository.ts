import { GenericError } from '../../../shared/errors/genericerror';
import { Repository } from '../../../shared/repositories/repository';
import { PaymentDocument } from './payment.document';
import httpStatus from 'http-status';

export class PaymentRepository extends Repository<PaymentDocument> {
  async findByTransaction(transaction: string) {
    const model = await this.modelInstance.findOne({ transaction }).exec();
    if (!model) {
      throw new GenericError('Model not found', httpStatus.NOT_FOUND);
    }
    return model;
  }
}
