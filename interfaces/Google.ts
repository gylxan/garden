export interface GoogleError {
  reason: string;
  message: string;
}

export type GoogleErrors = {
  errors: GoogleError[];
};
