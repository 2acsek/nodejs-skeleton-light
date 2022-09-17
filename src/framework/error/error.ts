type ErrorDetail = Record<string, unknown>;

export abstract class DetailedError extends Error {
  abstract getDetails(): ErrorDetail | undefined;
}

export type MappedError = {
  status: number;
  errorCode: string;
  details?: Record<string, unknown>;
};

export type ErrorMapper = (err: Error) => MappedError | null;

export const isDetailedError = (err: Error | DetailedError): err is DetailedError => err instanceof DetailedError;
