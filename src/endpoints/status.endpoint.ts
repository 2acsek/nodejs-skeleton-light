import { RouteOptions } from 'fastify';
import { EntityName, ResourceNotFoundError } from '../framework/error/resource-not-found-error';

export const statusEndpointFactory = ({ version }: { version: string }): RouteOptions => ({
  url: '/status',
  method: 'GET',
  schema: {
    querystring: {
      required: ['asd'],
      type: 'object',
      properties: {
        asd: {
          type: 'string',
        },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          timestamp: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          version: {
            type: 'string',
          },
        },
      },
    },
  },
  handler: async (_, res) => {
    throw new ResourceNotFoundError(EntityName.UNKNOWN);
    res.status(200).send({
      timestamp: Date.now(),
      status: 'ok',
      version,
    });
  },
});
