/**
 * Interfaces for common errors
 */

/** Interface to show errors */
export interface HttpApiError<T = any> {
  /** Status for the error */
  status: number;
  /** Status for the error */
  message: string;
  /** The sub code for this error */
  subcode?: number;
  /** Aditional data for the error to be used for error handling */
  info?: T;
}
