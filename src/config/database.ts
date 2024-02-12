import mongoose, { ConnectOptions } from 'mongoose';
import Logger from '../lib/logger';

interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
}

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clikalia-test';

export function connection(): void {
  mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  } as CustomConnectOptions);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  db.once('open', () => {
    Logger.info('Conexión exitosa a MongoDB');
  });

  // Manejar un evento de cierre de conexión
  db.on('close', () => {
    Logger.info('Conexión exitosa a MongoDB');
  });
}
