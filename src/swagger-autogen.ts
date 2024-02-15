import { config } from 'dotenv';
config();

import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen({
  autoHeaders: false,
  autoQuery: false,
  autoBody: false
});

const HOST = process.env.APP_HOST || 'localhost',
  PORT = process.env.HTTP_PORT || 3000;

const doc = {
  info: {
    version: '0.0.8',
    title: 'Clikalia-test',
    description: 'Respuesta a prueba técnica de Clikalia'
  },
  host: `${HOST}:${PORT}`,
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Payment',
      description: 'Módulo para procesar los pagos'
    }
  ],
  definitions: {
    PayDto: {
      amount: 10,
      gateway: 'PGateway_1'
    },
    PayResponseDto: {
      amount: 10,
      gateway: 'PGateway_1',
      transaction: '2a008a68-5dbe-4ca9-b855-0f95d792f69a'
    },
    RefundDto: {
      transaction: '2a008a68-5dbe-4ca9-b855-0f95d792f69a'
    },
    RefundResponseDto: {
      amount: 10,
      transaction: '2a008a68-5dbe-4ca9-b855-0f95d792f69a'
    },
    PartialRefundDto: {
      amount: 10,
      transaction: '2a008a68-5dbe-4ca9-b855-0f95d792f69a'
    },
    PartialRefundResponseDto: {
      amount: 10,
      transaction: '2a008a68-5dbe-4ca9-b855-0f95d792f69a'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [path.resolve('src', 'modules', 'payment', 'payment.route.ts')];

swagger(outputFile, endpointsFiles, doc).then(res => {
  if (res && res.success) require('./index'); // Your project's root file
});
