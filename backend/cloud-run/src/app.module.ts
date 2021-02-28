import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { RecipesController } from './controllers/recipes/recipes.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [RecipesController, UserController],
  providers: [],
})
export class AppModule {}
