import fastify, { FastifyInstance, RouteOptions } from 'fastify';
import { Config } from './config';
import { statusEndpointFactory } from './endpoints/status.endpoint';
import { Logger } from './framework/logger/logger';
import fastifyCors from '@fastify/cors';
import { errorHandlerFactory } from './framework/error/error-handler';
import { errorMapper } from './framework/error/error-map';
import { errorHandlerFastifyMWFactory } from './framework/fastify/error-mw-fastify.factory';

export const createApp = async ({
  logger,
  config,
  version,
}: {
  logger: Logger;
  config: Config;
  version: string;
}): Promise<FastifyInstance> => {
  const server = fastify({
    logger,
  });

  const statusEndpoint = statusEndpointFactory({ version });

  server.register(fastifyCors, { origin: config.cors.allowAll ? '*' : config.cors.origins });

  server.setNotFoundHandler((_, reply) => void reply.status(404).send({ errorCode: 'NOT_FOUND' }));

  server.setErrorHandler(errorHandlerFastifyMWFactory({ errorHandler: errorHandlerFactory({ errorMapper, logger }) }));
  const endpoints: RouteOptions[] = [statusEndpoint];

  await Promise.all(
    endpoints.map(endpoint =>
      server.register((server: FastifyInstance, _: never, next: () => void) => {
        server.route(endpoint);
        next();
      }),
    ),
  );

  return server;
};
