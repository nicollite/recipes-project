import { GetRecipesPageQuery, IRecipe } from "shared";
import { api } from "./api";

/**
 * Sort the recipes array with by created_at with the newest in the fires positions
 * @param recipes The recipes array
 * @returns The sorted recipes array
 */
export const sortRecipesByNew = (recipes: IRecipe[]) =>
  recipes.sort((a, b) => {
    const aDate = new Date(a.created_at).valueOf();
    const bDate = new Date(b.created_at).valueOf();
    return bDate - aDate;
  });

export const getRecipesPage = (options: GetRecipesPageQuery) => {
  return api
    .get<IRecipe[]>("/recipes", { params: options })
    .then(res => res.data);
};

export const getRecipeById = (id: string) => {
  return api.get<IRecipe>(`/recipes/${id}`).then(res => res.data);
};

export const createRecipe = (recipe: IRecipe): Promise<IRecipe> => {
  return api.post<IRecipe>("/recipes", recipe).then(res => res.data);
};
export const updateRecipe = (recipe: IRecipe): Promise<IRecipe> => {
  return api.put<IRecipe>("/recipes", recipe).then(res => res.data);
};
