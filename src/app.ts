import fastify, { FastifyError, FastifyInstance, RouteOptions } from 'fastify';
import { Config } from './config';
import { statusEndpointFactory } from './endpoints/status.endpoint';
import { Logger } from './framework/logger/logger';
import fastifyCors from '@fastify/cors';

export const createApp = async ({
  logger,
  config,
  version,
}: {
  logger: Logger;
  config: Config;
  version: string;
}): Promise<FastifyInstance> => {
  const fastifyServer = fastify({
    logger,
  });

  const statusEndpoint = statusEndpointFactory({ version });

  fastifyServer.register(fastifyCors, { origin: config.cors.allowAll ? '*' : config.cors.origins });

  fastifyServer.setNotFoundHandler((_, reply) => void reply.status(404).send({ errorCode: 'NOT_FOUND' }));

  const endpoints: RouteOptions[] = [statusEndpoint];

  await Promise.all(
    endpoints.map(endpoint =>
      fastifyServer.register((server: FastifyInstance, _: never, next: (err?: FastifyError) => void) => {
        server.route(endpoint);
        next();
      }),
    ),
  );

  return fastifyServer;
};
