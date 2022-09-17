import { RouteOptions } from 'fastify';

export const statusEndpointFactory = ({ version }: { version: string }): RouteOptions => ({
  url: '/status',
  method: 'GET',
  schema: {
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
    res.status(200).send({
      timestamp: Date.now(),
      status: 'ok',
      version,
    });
  },
});
