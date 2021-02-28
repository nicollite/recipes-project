import { Module } from "@nestjs/common";

// Services
const providers = [];

@Module({
  providers,
  exports: providers,
})
export class CoreModule {}
