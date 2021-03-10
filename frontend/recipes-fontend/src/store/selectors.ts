import { IRecipe, IUser } from "shared";
import { ApplicationState } from "./types";

/**
 * Get the user data in the store
 * @param state The application state
 * @returns The user data
 */
export const getUser = (state: ApplicationState): IUser => state.user.data;

/**
 * Get the recipes array in the store
 * @param state The application state
 * @returns The recipes array
 */
export const getRecipes = (state: ApplicationState): IRecipe[] =>
  state.recipes.map(recipe => {
    recipe.created_at =
      typeof recipe.created_at === "string" ? new Date(recipe.created_at) : recipe.created_at;
    return recipe;
  });

/**
 * Get the recipes array in the store
 * @param state The application state
 * @param page The page number starting on 0
 * @param pageSize The number of recipes per page
 * @returns The recipes array
 */
export const selectRecipesPage = (
  state: ApplicationState,
  page: number,
  pageSize: number,
): IRecipe[] => {
  const start = page * pageSize;
  const end = start + pageSize;
  return state.recipes.slice(start, end);
};

/**
 * Get a recipe by it's id
 * @param state The application state
 * @param recipeId The recipe id to find
 * @returns The recipe if founded otherwise undefined
 */
export const getRecipeById = (state: ApplicationState, recipeId: string): IRecipe =>
  state.recipes.find(recipe => recipe._id === recipeId);

/**
 * Get the last recipe in teh state
 * @param state The application state
 * @returns The last recipe id
 */
export const getLastRecipeId = (state: ApplicationState): string => {
  const recipes = state.recipes;
  return recipes[recipes.length - 1]?._id;
};
