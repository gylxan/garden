import { IError, IErrorResponse, IErrorType } from '../interfaces/Error';

export const validationError = (message: string, subject: string): IError => ({
  message,
  subject,
  type: IErrorType.ValidationError,
});
export const validationErrorResponse = (message: string, subject: string): IErrorResponse =>
  errorResponse({ message, subject, type: IErrorType.ValidationError });

export const errorResponse = ({
  message,
  type = IErrorType.GeneralError,
  subject,
}: Partial<IError> & { message: string }): IErrorResponse => ({
  error: {
    message,
    type,
    ...(subject ? { subject } : {}),
  },
});
