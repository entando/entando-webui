import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export class RestError extends Error {
  status: number;
  errors?: Array<string>;
  
  constructor(status: number, message: string, errors?: Array<string>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export class NotFoundError extends RestError {
  constructor(message?: string) {
    super(404, message || 'Not Found');
  }
}

export class ForbiddenError extends RestError {
  constructor(message?: string) {
    super(403, message || 'Access Denied');
  }
}

export class InternalServerError extends RestError {
  constructor(message?: string) {
    super(500, message || 'Internal Server Error');
  }
}

export class BadRequestError extends RestError {
  constructor(errors: ValidationError[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const errorMessages: string[] = errors.map((error: ValidationError) => Object.values(error.constraints!)).flat();
    super(400, 'Validation Error', errorMessages);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res
    .status(err.status || 500)
    .json({
      message: err.message || 'Internal Server Error',
      errors: err.errors,
    });
};

export default errorHandler;
