export type HttpApiError<T> = any;

/** Aditional informations or data for the error */
export interface AditionalErrorInfo<T = any> {
  /** Aditional data for the error */
  info?: T;
  /** The sub code for this error */
  subcode?: number;
  /** Stack */
  stack?: string;
}

/** Error class */
export class HttpError<T = any> extends Error {
  /** Extra informations from the error */
  info: T;

  /** Subcode of the error */
  subcode: number;

  /** Timestamp of the error */
  timestamp: string = new Date().toISOString();

  constructor(
    /** Status for the error */
    public status: number = 500,
    /** Message for the error */
    public message: string = "Something went wrong",
    adicionalInfo: AditionalErrorInfo<T> = {},
  ) {
    super(message);
    const { info, subcode, stack } = adicionalInfo;
    if (stack) this.stack = stack;
    this.info = info;
    this.subcode = subcode;
  }

  /** Create an object to return to the client */
  serializeJson(): HttpApiError<T> {
    return {
      status: this.status,
      message: this.message,
      subcode: this.subcode,
      info: this.info,
    };
  }

  static fromError<T = any>(
    error: Error,
    status: number,
    adicionalInfo: AditionalErrorInfo<T> = {},
  ): HttpError {
    return new HttpError(status, error.message, { ...adicionalInfo, stack: error.stack });
  }
}
