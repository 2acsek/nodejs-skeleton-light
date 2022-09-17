import { ValidationResult } from 'fastify';
import { DetailedError } from './error';
import { VALIDATION_ERROR } from './error.constants';

export class ValidationError extends DetailedError {
  constructor(private errors: ValidationResult[]) {
    super(VALIDATION_ERROR);
  }

  getDetails(): Record<string, unknown> {
    return { errors: this.errors };
  }
}
