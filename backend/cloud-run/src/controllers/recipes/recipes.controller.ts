import { logger } from "@logger";
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { GetRecipesPageQuery, IRecipe } from "shared";
import { AuthGuard } from "src/guards/auth.guard";
import { Recipe, RecipeDocument } from "src/schemas/recipes";
import { ParseGetQueryPipe } from "./parse-get-query.pipe";

export interface GetRecipeParam {
  id: string;
}

@Controller("recipes")
export class RecipesController {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

  @Get()
  async getRecipesPage(@Query(ParseGetQueryPipe) query: GetRecipesPageQuery) {
    // Destructure the query string, set the lastId to a initial object
    const { lastId = 0, pageSize = 10 } = query;

    const find = lastId ? new Types.ObjectId(lastId) : {};

    return this.recipeModel.find(find).sort({ _id: -1 }).limit(pageSize).exec();
  }

  @Get("/:id")
  async getRecipe(@Param() params: GetRecipeParam) {
    // Destructure the query string, set the lastId to a initial object
    const { id } = params;

    return this.recipeModel
      .find({ _id: id })
      .exec()
      .then(docs => docs.shift());
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRecipe(@Body() body: IRecipe | IRecipe[]) {
    logger.info("creating recipes...", { recipes: body });
    if (Array.isArray(body)) {
      const recipes = body.map(recipe => new this.recipeModel(recipe));
      return this.recipeModel.insertMany(recipes).then(docs => docs.map(doc => doc.toJSON()));
    } else {
      return new this.recipeModel(body).save().then(doc => doc.toJSON());
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateRecipe(@Body() body: IRecipe) {
    logger.info("updating recipe...", { recipes: body });
    return this.recipeModel.updateOne(
      { _id: new Types.ObjectId(body._id) },
      new this.recipeModel(body),
    );
  }
}
