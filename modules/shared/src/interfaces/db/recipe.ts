import { Time, Text } from "./commons";
import { UserRef } from "./user";
import { ObjectId } from "bson";

export interface IRecipe {
  _id?: string | ObjectId;
  recipe_name: string;
  description: string;
  ingredients: Ingredient[];
  cook_phases: CookPhase[];
  portions_amount: number;
  preparation_time: Time;
  author: UserRef;
  created_at: Date | string;
}

export interface Ingredient extends Text {}

export interface CookPhase {
  title: string;
  steps: Text[];
}
