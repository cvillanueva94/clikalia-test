import { config } from 'dotenv';
config();
import request from 'supertest';
import * as http from 'http';
import { ClikaliaApp } from '../../../src/clikalia-app';

describe('Pruebas E2E para el modulo de payment', () => {
  let app: http.Server | undefined;
  let clikaliaApp: ClikaliaApp;

  beforeAll(async () => {
    clikaliaApp = new ClikaliaApp();
    clikaliaApp.start();
    app = clikaliaApp.httpServer;
  });

  afterAll(async () => {
    await clikaliaApp.stop();
  });

  describe('Probando los diferentes metodo para la pasarela PGateway_1', () => {
    it(`POST /payment/refund Debería responder con status 200`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_1'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction
      };
      // Ejecutamos un reembolso total
      const response = await request(app).post('/payment/refund').send(dto);
      expect(response.status).toBe(200);
      expect(response.body.transaction).toBeDefined();
    });

    it(`POST /payment/partial-refund Debería responder con status 200`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_1'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction,
        amount: 5
      };
      // Ejecutamos un reembolso parcial
      const response = await request(app).post('/payment/partial-refund').send(dto);
      expect(response.status).toBe(200);
      expect(response.body.transaction).toBe(dto.transaction);
      expect(response.body.amount).toBe(dto.amount);
    });

    it(`POST /payment/partial-refund Debería responder con status 400`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_1'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction,
        amount: 15
      };
      // Ejecutamos un reembolso parcial
      const response = await request(app).post('/payment/partial-refund').send(dto);
      expect(response.status).toBe(400);
    });

    it(`POST /payment/partial-refund Debería responder con status 400`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_1'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction,
        amount: 0
      };
      // Ejecutamos un reembolso parcial
      const response = await request(app).post('/payment/partial-refund').send(dto);
      expect(response.status).toBe(400);
    });
  });

  describe('Probando los diferentes metodo para la pasarela PGateway_2', () => {
    it(`POST /payment/pay Debería responder con status 200`, async () => {
      const dto = {
        amount: 10,
        gateway: 'PGateway_2'
      };
      // Ejecutamos un pago
      const response = await request(app).post('/payment/pay').send(dto);
      expect(response.status).toBe(200);
      expect(response.body.amount).toBe(dto.amount);
      expect(response.body.gateway).toBe(dto.gateway);
      expect(response.body.transaction).toBeDefined();
    });

    it(`POST /payment/refund Debería responder con status 200`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_2'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction
      };
      // Ejecutamos un reembolso total
      const response = await request(app).post('/payment/refund').send(dto);
      expect(response.status).toBe(200);
      expect(response.body.transaction).toBeDefined();
    });

    it(`POST /payment/partial-refund Debería responder con status 400`, async () => {
      // Primero creamos un pago
      const payDto = {
        amount: 10,
        gateway: 'PGateway_2'
      };
      // Ejecutamos un pago
      const payResponse = await request(app).post('/payment/pay').send(payDto);
      expect(payResponse.status).toBe(200);

      const dto = {
        transaction: payResponse.body.transaction,
        amount: 8
      };
      // Ejecutamos un reembolso parcial
      const response = await request(app).post('/payment/partial-refund').send(dto);
      expect(response.status).toBe(400);
    });
  });

  describe('Probando los diferentes metodo para la pasarela PGateway_3', () => {
    it(`POST /payment/pay Debería responder con status 400`, async () => {
      const dto = {
        amount: 10,
        gateway: 'PGateway_3'
      };
      // Ejecutamos un pago
      const response = await request(app).post('/payment/pay').send(dto);
      expect(response.status).toBe(400);
    });

    it(`POST /payment/pay Debería responder con status 400`, async () => {
      const dto = {
        gateway: 'PGateway_3'
      };
      // Ejecutamos un pago
      const response = await request(app).post('/payment/pay').send(dto);
      expect(response.status).toBe(400);
    });

    it(`POST /payment/refund Debería responder con status 400`, async () => {
      const dto = {};
      // Ejecutamos un pago
      const response = await request(app).post('/payment/refund').send(dto);
      expect(response.status).toBe(400);
    });

    it(`POST /payment/partial-refund Debería responder con status 400`, async () => {
      const dto = {};
      // Ejecutamos un pago
      const response = await request(app).post('/payment/partial-refund').send(dto);
      expect(response.status).toBe(400);
    });
  });
});
