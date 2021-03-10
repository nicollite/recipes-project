import { HttpError } from "@http-error";
import { logger } from "@logger";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { env } from "@env";
import { auth } from "firebase-admin";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers["authorization"] as string;
    if (!authHeader || !(typeof authHeader === "string"))
      throw new HttpError(400, "Invalid or missing authorization header");
    const [scheme, token] = authHeader.split(" ");

    if (!token) throw new HttpError(400, "Invalid authorization schema");
    if (env.NODE_ENV === "dev" && token === env.TEST_TOKEN) return true;

    if (scheme === "JWT") {
      try {
        verify(token, env.TEST_TOKEN) as any;
        return true;
      } catch (err) {
        logger.info("JWT invalid token", { err });
        throw new HttpError(403, "Forbiden Request");
      }
    } else if (scheme === "AuthFire") {
      try {
        await auth().verifyIdToken(token);
        return true;
      } catch (err) {
        logger.info("AuthFire invalid token", { err });
        throw new HttpError(403, "Forbiden Request");
      }
    }

    new HttpError(401, "Invalid authorization schema");
  }
}
