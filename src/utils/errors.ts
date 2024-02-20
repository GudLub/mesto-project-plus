export class NotFoundError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 404;
  }
}

export class AuthError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 401;
  }
}

export class BadRequestError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ConflictingRequestError extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 409;
  }
}

export class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}