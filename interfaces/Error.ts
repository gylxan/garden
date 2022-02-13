export enum IErrorType {
  ValidationError = 'ValidationError',
  GeneralError = 'GeneralError',
}

export type IError = {
  type: IErrorType;
  subject?: string;
  message: string;
};

export type IErrorResponse = {
  error: IError;
};
