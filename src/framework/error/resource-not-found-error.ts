import { DetailedError } from './error';
import { RESOURCE_NOT_FOUND } from './error.constants';

export enum EntityName {
  UNKNOWN = 'UNKNOWN',
}

export class ResourceNotFoundError extends DetailedError {
  constructor(private entity: EntityName) {
    super(RESOURCE_NOT_FOUND);
  }

  public getDetails(): { entityName: EntityName } {
    return {
      entityName: this.entity,
    };
  }
}
