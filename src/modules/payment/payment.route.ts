import { Request, Response, Router } from 'express';

import { PaymentController } from './app/controllers/payment.controller';

export const register = (router: Router): void => {
  const paymentController: PaymentController = new PaymentController();
  const RouterName = '/payment';

  router.post(`${RouterName}/pay`, (req: Request, res: Response) => paymentController.pay(req, res));
  router.post(`${RouterName}/refund`, (req: Request, res: Response) => paymentController.refund(req, res));
  router.post(`${RouterName}/partial-refund`, (req: Request, res: Response) =>
    paymentController.partialRefund(req, res)
  );
};
