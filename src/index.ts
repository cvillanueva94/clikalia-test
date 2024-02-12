import { ClikaliaApp } from './clikalia-app';
import { config } from 'dotenv';

try {
  config();
  new ClikaliaApp().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
