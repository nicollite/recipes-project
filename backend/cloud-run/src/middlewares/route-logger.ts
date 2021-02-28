import { logger } from "@logger";
import { Request, Response, NextFunction } from "express";

/** Logs the route being called */
export function routeLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.url}`, {
    url: req.url,
    method: req.method,
  });

  next();
}
