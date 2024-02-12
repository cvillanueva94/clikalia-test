import { Schema, model } from 'mongoose';
import { ICRUDDocument } from '../../../shared/interfaces/ICRUDDocument';

export interface PaymentDocument extends ICRUDDocument {
  amountPaid: number;
  refundedAmount: number;
  gateway: string;
  transaction?: string;
}

const PaymentSchema = new Schema<PaymentDocument>({
  amountPaid: { type: Number, required: true },
  refundedAmount: { type: Number },
  gateway: { type: String, required: true },
  transaction: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model<PaymentDocument>('payment', PaymentSchema);
