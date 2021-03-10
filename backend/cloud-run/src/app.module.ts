import { Module } from "@nestjs/common";
import { env } from "@env";

// Modules
import { MongooseModule } from "@nestjs/mongoose";
import { RouterModule } from "nest-router";

// Controllers
import { RecipesController } from "./controllers/recipes/recipes.controller";
import { UserController } from "./controllers/user/user.controller";

// Schemas
import { Recipe, RecipeSchema } from "./schemas/recipes";
import { User, UserSchema } from "./schemas/user";

// Routes
import { routes } from "./routes";

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_DB_URL),
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: User.name, schema: UserSchema }
    ]),
    RouterModule.forRoutes(routes)
  ],
  controllers: [RecipesController, UserController],
  providers: []
})
export class AppModule {}
