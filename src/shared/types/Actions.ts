import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../../redux/actions/constructor";
import {
  HIDE_HOME_PAGE,
  HIDE_INGREDIENT_MODAL,
  SHOW_INGREDIENT_MODAL,
} from "../../redux/actions/ingredientModal";
import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SELECT_BUNS_TAB,
  SELECT_INNERS_TAB,
  SELECT_SAUCES_TAB,
  INCREASE_INGREDIENTS_COUNTER,
  DECREASE_INGREDIENTS_COUNTER,
} from "../../redux/actions/ingredients";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../../redux/actions/order";
import { Ingredient } from "./Ingredient";
import { SortedIngredients } from "./SortedIngredients";
import {
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_USER_FAIL,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../../services/userAuth";

type HideIngredientModal = {
  type: typeof HIDE_INGREDIENT_MODAL;
};

type SetIngredientModal = {
  type: typeof SHOW_INGREDIENT_MODAL;
  ingredient: Ingredient;
};

type GetIngredientsRequestAction = {
  type: typeof GET_INGREDIENTS_REQUEST;
};

type GetIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: SortedIngredients;
};

type IncreaseIngredientCounter = {
  type: typeof INCREASE_INGREDIENTS_COUNTER;
  id: string;
};

type GetIngredientsError = {
  type: typeof GET_INGREDIENTS_ERROR;
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

type IncreaseTotalPrice = {
  type: typeof SET_TOTAL_PRICE;
  totalPrice: number;
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

type DecreaseDraggingCounter = {
  type: typeof DECREASE_INGREDIENTS_COUNTER;
  id: string;
};

type GetUser = {
  type: typeof LOGOUT;
};

type SetUserRequest = {
  type: typeof SET_USER_REQUEST;
};

type SetUserFail = {
  type: typeof SET_USER_FAIL;
};

type SetUserSuccess = {
  type: typeof SET_USER_SUCCESS;
  name: string;
  email: string;
};

type LoginRequest = {
  type: typeof LOGIN_REQUEST;
};

type LoginFail = {
  type: typeof LOGIN_FAIL;
};

type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  email: string;
  name: string;
  password?: string;
};

type HideHomePage = {
  type: typeof HIDE_HOME_PAGE;
};

export type ActionTypes =
  | HideHomePage
  | LoginRequest
  | LoginFail
  | LoginSuccess
  | SetUserSuccess
  | SetUserFail
  | SetUserRequest
  | GetUser
  | DecreaseDraggingCounter
  | IncreaseIngredientCounter
  | SubmitOrderRequest
  | SubmitOrderFail
  | SubmitOrderSuccess
  | MoveConstructorIngredient
  | RemoveConstructorIngredient
  | GetIngredientsRequestAction
  | GetIngredientsSuccessAction
  | GetIngredientsError
  | SelectBunsTabAction
  | SelectInnersTabAction
  | SelectSaucesTabAction
  | HideIngredientModal
  | SetIngredientModal
  | IncreaseTotalPrice
  // | SetConstructorIngredients
  | AddConstructorIngredient;
