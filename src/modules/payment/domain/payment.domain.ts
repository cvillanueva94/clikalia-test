import { TimestampProps } from 'src/shared/props/domain.timestamps';
import { DomainEntity } from '../../../shared/models/domain.entity';
import { DomainInternalProps } from 'src/shared/props/_domain.protected.props';

type PaymentProps = TimestampProps & {
  amount: number;
  gateway: string;
  transaction?: string;
};

export type NewPaymentProps = Omit<PaymentProps, keyof DomainInternalProps>;

export type UpdatePaymentProps = {
  transaction?: string;
};

export class PaymentDomain extends DomainEntity<PaymentProps> {
  public New(props: NewPaymentProps): PaymentDomain {
    return this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    });
  }

  public Create(props: PaymentProps, id?: string): PaymentDomain {
    // aqui irian todas la validaciones del dominio
    return new PaymentDomain(props, id);
  }

  public update(props: UpdatePaymentProps): PaymentDomain {
    this.props.updatedAt = new Date();

    this.props.transaction = props.transaction || this.props.transaction;

    return PaymentDomain.prototype.Create(this.props, this.id);
  }
}
