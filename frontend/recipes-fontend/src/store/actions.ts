import { IRecipe } from "shared";
import {
  UserLoginData,
  UserLoginAction,
  UserLogoutAction,
  RecipeSetAction,
  RecipeEditAction,
  UserSetTokenAction,
} from "./types";

// user
export const userLogin = (userLogin: UserLoginData): UserLoginAction => ({
  type: "user/login",
  ...userLogin,
});

export const userSetToken = (token: string): UserSetTokenAction => ({
  type: "user/setToken",
  jwt: {
    token,
    expiration: Date.now(),
  },
});

export const userLogout = (): UserLogoutAction => ({
  type: "user/logout",
});

// Recipes
export const setRecipes = (recipes: IRecipe | IRecipe[]): RecipeSetAction => ({
  type: "recipes/set",
  recipes,
});

export const editRecipes = (recipes: IRecipe | IRecipe[]): RecipeEditAction => ({
  type: "recipes/edit",
  recipes,
});
