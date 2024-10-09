export enum PayloadStatus {
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

/**
 * Base model for API response payloads
 */
export interface Payload<T> {
  status: PayloadStatus;
  message: string | null;
  data: T;
}
