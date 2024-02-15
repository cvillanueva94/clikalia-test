import { Request, Response, Router } from 'express';

import { PaymentController } from './app/controllers/payment.controller';

export const register = (router: Router): void => {
  const paymentController: PaymentController = new PaymentController();

  router.post(`/payment/pay`, (req: Request, res: Response) => {
    // #swagger.tags = ['Payment']
    // #swagger.description = 'Ruta para procesar los pagos.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Información necesaria para procesar el pago',
            schema: { $ref: '#/definitions/PayDto' }
    	} */
    /* #swagger.responses[200] = { 
          description: 'Respuesta afirmativa del pago',
		  schema: { $ref: '#/definitions/PayResponseDto' }
      	} */
    return paymentController.pay(req, res);
  });

  router.post(`/payment/refund`, (req: Request, res: Response) => {
    // #swagger.tags = ['Payment']
    // #swagger.description = 'Ruta para procesar reembolsos totales.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Información necesaria para procesar el reembolso',
            schema: { $ref: '#/definitions/RefundDto' }
    	} */
    /* #swagger.responses[200] = { 
          description: 'Respuesta afirmativa del reembolso',
		  schema: { $ref: '#/definitions/RefundResponseDto' }
      	} */
    return paymentController.refund(req, res);
  });
  router.post(`/payment/partial-refund`, (req: Request, res: Response) => {
    // #swagger.tags = ['Payment']
    // #swagger.description = 'Ruta para procesar los reembolsos parciales.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Información necesaria para procesar el reembolso',
            schema: { $ref: '#/definitions/PartialRefundDto' }
    	} */
    /* #swagger.responses[200] = { 
          description: 'Respuesta afirmativa del reembolso',
		  schema: { $ref: '#/definitions/PartialRefundResponseDto' }
      	} */
    paymentController.partialRefund(req, res);
  });
};
