/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorMessage = {
  path: string;
  message: string;
}[];

export type TErrorResponse = {
  statusCode: number;
  errorMessage?: string;
  errorDetails: string | any;
  error?: any;
  stack?: string | any;
};
