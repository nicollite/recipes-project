// Run setup config
import "./config/setup";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { HttpErrorFilter } from "./exceptions/http-error-filter";
import { routeLogger } from "@middlewares/route-logger";

import { env } from "@env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorFilter());
  app.use(routeLogger);
  await app.listen(env.PORT, env.HOST, () => {
    console.log(`listening on http://${env.HOST}:${env.PORT}`);
  });
}
bootstrap();
