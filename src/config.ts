import convict from 'convict';

const configObject = convict({
  port: {
    doc: 'The application port',
    format: Number,
    default: 3333,
    env: 'PORT',
  },
  host: {
    doc: 'The application host',
    format: String,
    default: '0.0.0.0',
    env: 'HOST',
  },
  version: {
    doc: 'The application version',
    format: String,
    default: '0.0.0',
    env: 'VERSION',
  },
  cors: {
    allowAll: {
      doc: 'CORS Allow All',
      format: Boolean,
      default: true,
      env: 'CORS_ALLOW_ALL',
    },
    origins: {
      doc: 'CORS Origins',
      format: String,
      default: '',
      env: 'CORS_ORIGINS',
    },
  },
});

configObject.validate({ allowed: 'warn' });

export const config = configObject.getProperties();
export type Config = typeof config;
