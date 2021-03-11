import { Action } from "redux";
import { GetRecipesPageQuery, IRecipe, IUser } from "shared";
import { Observable } from "rxjs";

/** JWT for refreshing token with backend */
export interface AuthJwt {
  token: string;
  expiration: number;
}

export interface UserState {
  data?: IUser;
  jwt?: AuthJwt;
}

export interface ApplicationState {
  recipes: IRecipe[];
  user: UserState;
}

// Common interfaces

// Action data

export interface UserLoginData {
  user: IUser;
  jwt: AuthJwt;
}

// User
export interface UserLoginAction extends Action, UserLoginData {
  type: "user/login";
}

export interface UserSetTokenAction extends Action {
  type: "user/setToken";
  jwt: AuthJwt;
}

export interface UserLogoutAction extends Action {
  type: "user/logout";
}

// Recipes
export interface RecipeSetAction extends Action {
  type: "recipes/set";
  recipes: IRecipe | IRecipe[];
}

export interface RecipeEditAction extends Action {
  type: "recipes/edit";
  recipes: IRecipe | IRecipe[];
}

export type UserActions = UserLoginAction | UserLogoutAction;

export type RecipesActions = RecipeSetAction | RecipeEditAction;

export type ApplicationAction = UserActions | RecipesActions;

// Effects

export interface EffectUserLogin {
  email: string;
  password: string;
}

export interface EffectUserSignUp {
  email: string;
  username: string;
  password: string;
}

export interface EffectGetRecipes extends GetRecipesPageQuery {}
