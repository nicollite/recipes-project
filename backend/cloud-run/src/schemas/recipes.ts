import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CookPhase, Ingredient, IRecipe, Time, UserRef } from "shared";
import { text, time } from "./commons";

export type RecipeDocument = Recipe & IRecipe & Document;

@Schema()
export class Recipe implements Partial<IRecipe> {
  @Prop()
  recipe_name: string;

  @Prop()
  description: string;

  @Prop(raw([{ ...text, _id: false }]))
  ingredients: Ingredient[];

  @Prop([
    raw({
      _id: false,
      title: String,
      steps: [{ ...text, _id: false }]
    })
  ])
  cook_phases: CookPhase[];

  @Prop()
  portions_amount: number;

  @Prop(raw(time))
  preparation_time: Time;

  @Prop(
    raw({
      username: String,
      uid: String
    })
  )
  author: UserRef;

  @Prop(Date)
  created_at: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
