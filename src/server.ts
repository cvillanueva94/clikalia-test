import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import morganMiddleware from './config/morgan-middleware';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';

import { connection } from './config/database';
import { registerRoutes } from './routes';
import Logger from './lib/logger';

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(morganMiddleware);
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    router.get('/', (req: Request, res: Response) => {
      res.status(httpStatus.OK).send('¡Hola, mundo!');
    });

    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    connection();
    registerRoutes(router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      Logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      const env = this.express.get('env') as string;
      this.httpServer = this.express.listen(this.port, () => {
        Logger.info(` Clikalia App is running at http://localhost:${this.port} in ${env} mode`);
        Logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer(): Server['httpServer'] {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        });
      }

      resolve();
    });
  }
}
