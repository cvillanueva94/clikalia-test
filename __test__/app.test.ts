import request from 'supertest';
import { ClikaliaApp } from '../src/clikalia-app';
import * as http from 'http';

describe('Pruebas E2E para mi aplicación ClikaliaApp', () => {
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

  it('Debería responder con status 200 y el texto "¡Hola, mundo!" en la ruta "/"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('¡Hola, mundo!');
  });
});
