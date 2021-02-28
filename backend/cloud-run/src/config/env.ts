import * as dotenv from "dotenv";

dotenv.config();

/** Object representing config on process.env */
export interface Env {
  /** Node enviroment */
  NODE_ENV: "dev" | "prod";
  /** The log name in GCP Cloud Logging which is represented by "projects/{projectId}/logs/{LOG_NAME}" */
  LOG_NAME: string;
  /** The port that the app will run */
  PORT: string;
  /** The host name for the app */
  HOST: string;
  /** MongoDB url */
  MONGO_DB_URL: string;
}

/** Environment object */
export const env: Env = Object.assign({}, process.env) as any;
