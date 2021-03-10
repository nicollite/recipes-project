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
  /** Auth test token */
  TEST_TOKEN: string;
}

/** Environment object */
export const env: Env = Object.assign({}, process.env) as any;
env.NODE_ENV = env.NODE_ENV || "dev";
env.PORT = env.PORT || "3000";
env.HOST = env.HOST || "localhost";
env.MONGO_DB_URL = env.MONGO_DB_URL || "mongodb://127.0.0.1:27017";
