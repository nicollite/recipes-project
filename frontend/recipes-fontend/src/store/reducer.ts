import produce from "immer";
import { sortRecipesByNew } from "src/services/recipes";
import {
  ApplicationState,
  ApplicationAction,
  UserLoginAction,
  RecipeEditAction,
  RecipeSetAction,
} from "./types";
import { removeRepeat } from "@nicollite/utils";

export const initialState: ApplicationState = {
  recipes: [],
  user: {
    data: null,
    jwt: null,
  },
};

export type ActionMapFn = (action: ApplicationAction) => (state: ApplicationState) => void;
export type ActionMapKeys = ApplicationAction["type"];
export type ActionMap = Record<ActionMapKeys, ActionMapFn>;

/** Map with the action type as the key and a ActionMapFn as the value  */
const actionMap: ActionMap = {
  "user/login": (action: UserLoginAction) => state => {
    state.user.data = action.user;
    state.user.jwt = action.jwt;
  },
  "user/logout": () => state => {
    state.user = {
      data: null,
      jwt: null,
    };
  },
  "recipes/set": (action: RecipeSetAction) => state => {
    const recipes = Array.isArray(action.recipes) ? action.recipes : [action.recipes];

    state.recipes.push(...recipes);
    state.recipes = removeRepeat(sortRecipesByNew(state.recipes), "_id");
  },
  "recipes/edit": (action: RecipeEditAction) => state => {
    const recipes = Array.isArray(action.recipes) ? action.recipes : [action.recipes];
    recipes.forEach(recipe => {
      const index = state.recipes.findIndex(r => r._id === recipe._id);
      state.recipes[index] = recipe;
    });
  },
};

// Empty function if the type is not finded in the actionMap
const emptyFn = () => () => {};

export const reducer = (state = initialState, action: ApplicationAction) => {
  const actionFn: ActionMapFn = actionMap[action.type] || emptyFn;
  return produce(state, actionFn(action));
};
