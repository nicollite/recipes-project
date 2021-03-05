import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { IRecipe } from "shared";
import { Recipe, RecipeDocument } from "src/schemas/recipes";

export interface GetAllRecipesQuery {
  /** The last id to query */
  lastId?: string;
  pageSize: number;
}

export interface GetRecipeParam {
  id: string;
}

@Controller("recipes")
export class RecipesController {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

  @Get()
  async getAllRecipes(@Query() query: GetAllRecipesQuery) {
    // Destructure the query string, set the lastId to a initial object
    const { lastId = 0, pageSize = 10 } = query;

    return this.recipeModel
      .find({ _id: { $gt: new Types.ObjectId(lastId) } })
      .sort({ _id: 1 })
      .limit(pageSize)
      .exec();
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
  async createRecipe(@Body() body: IRecipe | IRecipe[]) {
    if (Array.isArray(body)) {
      const recipes = body.map(recipe => new this.recipeModel(recipe));
      return this.recipeModel.insertMany(recipes).then(docs => docs.map(doc => doc.toJSON()));
    } else {
      return new this.recipeModel(body).save().then(doc => doc.toJSON());
    }
  }

  @Put()
  async updateRecipe(@Body() body: IRecipe) {
    return this.recipeModel.updateOne(
      { _id: new Types.ObjectId(body._id) },
      new this.recipeModel(body)
    );
  }
}
