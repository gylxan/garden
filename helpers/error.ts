import { IErrorResponse } from '../interfaces/Error';

export const errorResponse = (message: string): IErrorResponse => ({
  error: {
    message,
  },
});
