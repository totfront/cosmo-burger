import {
  ADD_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_INGREDIENTS_FAIL,
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../../services/actions/constructor";
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
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../../services/actions/order";
import { Ingredient } from "./Ingredient";
import { SortedIngredients } from "./SortedIngredients";
import { SET_CONSTRUCTOR_INGREDIENTS } from "../../services/actions/constructor";

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

type GetConstructorIngredientsRequest = {
  type: typeof GET_CONSTRUCTOR_INGREDIENTS_REQUEST;
  isRequest: true;
};

type GetConstructorIngredientsFail = {
  type: typeof GET_CONSTRUCTOR_INGREDIENTS_FAIL;
  isRequest: false;
  isRequestFailed: true;
};

type GetConstructorIngredientsSuccess = {
  type: typeof GET_CONSTRUCTOR_INGREDIENTS_SUCCESS;
  ingredients: Ingredient[];
  isRequest: false;
  isRequestFailed: false;
};

type IncreaseTotalPrice = {
  type: typeof SET_TOTAL_PRICE;
  totalPrice: number;
};

type SetConstructorIngredients = {
  type: typeof SET_CONSTRUCTOR_INGREDIENTS;
  ingredients: SortedIngredients;
};

type AddConstructorIngredient = {
  type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  ingredient: Ingredient;
};

type RemoveConstructorIngredient = {
  type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
  index: number;
};

type MoveConstructorIngredient = {
  type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
};

type SubmitOrderRequest = {
  type: typeof SUBMIT_ORDER_REQUEST;
};

type SubmitOrderFail = {
  type: typeof SUBMIT_ORDER_FAIL;
  error: Error;
};

type SubmitOrderSuccess = {
  type: typeof SUBMIT_ORDER_SUCCESS;
  id: number;
  name: string;
};

export type ActionTypes =
  | SubmitOrderRequest
  | SubmitOrderFail
  | SubmitOrderSuccess
  | MoveConstructorIngredient
  | RemoveConstructorIngredient
  | GetIngredientsRequestAction
  | GetIngredientsSuccessAction
  | GetIngredientsFailAction
  | SelectBunsTabAction
  | SelectInnersTabAction
  | SelectSaucesTabAction
  | ShowIngredientModal
  | HideIngredientModal
  | GetConstructorIngredientsRequest
  | SetIngredientModal
  | GetConstructorIngredientsFail
  | IncreaseTotalPrice
  | SetConstructorIngredients
  | GetConstructorIngredientsSuccess
  | AddConstructorIngredient;
