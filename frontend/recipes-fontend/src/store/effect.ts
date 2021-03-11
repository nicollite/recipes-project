import { ThunkAction } from "redux-thunk";
import {
  ApplicationAction,
  ApplicationState,
  EffectGetRecipes,
  EffectUserLogin,
  EffectUserSignUp,
} from "./types";
import { editRecipes, setRecipes, userLogin, userLogout } from "./actions";
import * as auth from "src/services/auth";
import * as recipes from "src/services/recipes";
import { IRecipe } from "shared";

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

/**
 * Login the user with email and password
 * @param loginData The user login data
 */
export const loginUser = (loginData: EffectUserLogin): Effect => async dispatch => {
  const { email, password } = loginData;

  const userLoginData = await auth.login(email, password);

  dispatch(userLogin(userLoginData));
};

/**
 * Sign up and login the user with email, password and username
 * @param signUpData The sign up data
 */
export const signUpUser = (signUpData: EffectUserSignUp): Effect => async dispatch => {
  const { email, password, username } = signUpData;

  const userLoginData = await auth.signUp(email, password, username);

  dispatch(userLogin(userLoginData));
};

/** Logout the user authenticator */
export const logout = (): Effect => async dispatch => {
  await auth.signOut();
  dispatch(userLogout());
  auth.signInSub.next(false);
};

/** Try log the user */
export const setPersistentLogin = (): Effect => async dispatch => {
  const userLoginData = await auth.persistentLogin();
  if (userLoginData) dispatch(userLogin(userLoginData));
  else dispatch(userLogout());
  auth.signInSub.next(!!userLoginData);
};

/**
 * Get the next page of recipes from backend
 * @param options Options for getting the next page
 */
export const getRecipesNextPage = (options: EffectGetRecipes): Effect => async dispatch => {
  const recipesArr = await recipes.getRecipesPage(options);
  dispatch(setRecipes(recipesArr));
};

export const getRecipesById = (id: string): Effect => async dispatch => {
  const recipe = await recipes.getRecipeById(id);
  dispatch(setRecipes(recipe));
};

export const createNewRecipe = (recipe: IRecipe): Effect => async dispatch => {
  const newRecipe = await recipes.createRecipe(recipe);
  dispatch(setRecipes(newRecipe));
};

export const updateRecipe = (recipe: IRecipe): Effect => async dispatch => {
  const newRecipe = await recipes.updateRecipe(recipe);
  dispatch(editRecipes(newRecipe));
};
