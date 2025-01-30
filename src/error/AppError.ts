class AppError extends Error {
  public statusCode: number;

  public isOperational: boolean;

  public errors?: { field: string; message: string }[];
  public stack?: string;



  constructor(
    statusCode: number,
    public message: string,
    errors: { field: string; message: string }[]
    = [],
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;

     this.isOperational = isOperational;

     this.errors = errors;

     Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
