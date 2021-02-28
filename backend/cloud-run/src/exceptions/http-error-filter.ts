import { logger } from "@logger";
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { HttpError } from "./http-error";

@Catch()
export class HttpErrorFilter implements ExceptionFilter<HttpError> {
  catch(error: HttpError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // Log the error
    const errorMsg = error.stack || error.message;
    logger.error(errorMsg, { error });
    console.log(error);
    const httpError = error instanceof HttpError ? error : HttpError.fromError(error, 500);

    res.status(httpError.status).json(httpError.serializeJson());
  }
}
