import { createLogger, format, transports } from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import { env } from "@env";

/** Winston logger */
export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "logger" },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
});

// Add GCP Cloud Logging on production
if (env.NODE_ENV === "prod") {
  logger.add(
    new LoggingWinston({
      logName: env.LOG_NAME
    })
  );
}

// Add local file logging
if (env.NODE_ENV === "dev") {
  logger.add(
    new transports.File({
      filename: `dev.log`,
      format: format.json()
    })
  );
}
