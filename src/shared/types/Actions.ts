import { GET_CONSTRUCTOR_INGREDIENTS } from "../../services/actions/constructor";
import {
  HIDE_INGREDIENT_MODAL,
  SET_MODAL_INGREDIENT,
  SHOW_INGREDIENT_MODAL,
} from "../../services/actions/ingredientModal";
import {
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SELECT_BUNS_TAB,
  SELECT_INNERS_TAB,
  SELECT_SAUCES_TAB,
} from "../../services/actions/ingredients";
import { Ingredient } from "./Ingredient";
import { SortedIngredients } from "./SortedIngredients";

type ShowIngredientModal = {
  type: typeof SHOW_INGREDIENT_MODAL;
};

type HideIngredientModal = {
  type: typeof HIDE_INGREDIENT_MODAL;
};

type SetIngredientModal = {
  type: typeof SET_MODAL_INGREDIENT;
  ingredient: Ingredient;
};

type GetIngredientsRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type GetIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: SortedIngredients;
};

type GetIngredientsFailAction = {
  type: typeof GET_INGREDIENTS_FAIL;
  error: Error;
};

type SelectBunsTabAction = {
  type: typeof SELECT_BUNS_TAB;
};

type SelectInnersTabAction = {
  type: typeof SELECT_INNERS_TAB;
};

type SelectSaucesTabAction = {
  type: typeof SELECT_SAUCES_TAB;
};

type GetConstructorIngredients = {
  type: typeof GET_CONSTRUCTOR_INGREDIENTS;
  ingredients: Ingredient[];
};

export type ActionTypes =
  | GetIngredientsRequestAction
  | GetIngredientsSuccessAction
  | GetIngredientsFailAction
  | SelectBunsTabAction
  | SelectInnersTabAction
  | SelectSaucesTabAction
  | ShowIngredientModal
  | HideIngredientModal
  | GetConstructorIngredients
  | SetIngredientModal;
