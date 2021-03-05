import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "@env";

// Controllers
import { RecipesController } from "./controllers/recipes/recipes.controller";
import { UserController } from "./controllers/user/user.controller";

// Schemas
import { Recipe, RecipeSchema } from "./schemas/recipes";
import { User, UserSchema } from "./schemas/user";

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_DB_URL),
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [RecipesController, UserController],
  providers: []
})
export class AppModule {
  constructor() {
    console.log(this);
  }
}
