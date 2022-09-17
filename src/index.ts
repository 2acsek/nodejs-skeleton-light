import { createApp } from './app';
import { config } from './config';
import { loggerPinoFactory } from './framework/logger/logger-pino';

const version = process.env.npm_package_version || '0.0.0';

const logger = loggerPinoFactory({
  version,
  level: 'info',
  name: process.env.npm_package_name || 'nodejs-skeleton-light',
});

const main = async (): Promise<void> => {
  const app = await createApp({ logger, config, version });
  await app.listen({ port: config.port, host: config.host });
};

main().catch(err => {
  logger.error(err);
  process.exit(1);
});
