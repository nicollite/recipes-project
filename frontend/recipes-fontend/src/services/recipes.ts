import { GetRecipesPageQuery, IRecipe } from "shared";
import { api } from "./api";

/**
 * Sort the recipes array with by created_at with the newest in the fires positions
 * @param recipes The recipes array
 * @returns The sorted recipes array
 */
export const sortRecipesByNew = (recipes: IRecipe[]): IRecipe[] => {
  const toDate = v => (v instanceof Date ? v.valueOf() : new Date(v).valueOf());
  return recipes.sort((a, b) => toDate(b.created_at) - toDate(a.created_at));
};

/**
 * Get an array of recipes representing the current page
 * @param options Options to get the page
 * @returns A array of recipes
 */
export const getRecipesPage = (options: GetRecipesPageQuery): Promise<IRecipe[]> => {
  return api
    .get<IRecipe[]>("/recipes", { params: options })
    .then(res => res.data);
};

/**
 * Get a recipe by it1s id from api
 * @param id The recipe id
 * @returns The recipe object
 */
export const getRecipeById = (id: string): Promise<IRecipe> => {
  return api.get<IRecipe>(`/recipes/${id}`).then(res => res.data);
};

/**
 * Create a new recipe
 * @param recipe The new recipe object
 * @returns The new recipe
 */
export const createRecipe = (recipe: IRecipe): Promise<IRecipe> => {
  return api.post<IRecipe>("/recipes", recipe).then(res => res.data);
};

/**
 * update a existing recipe
 * @param recipe The recipe object
 * @returns The recipe object
 */
export const updateRecipe = (recipe: IRecipe): Promise<IRecipe> => {
  return api.put<IRecipe>("/recipes", recipe).then(() => recipe);
};
