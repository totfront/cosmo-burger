import { ActionTypes } from "../../shared/types/Actions";
import { Ingredient } from "../../shared/types/Ingredient";
import update from "immutability-helper";
import {
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_FAIL,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  SET_TOTAL_PRICE,
  SET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor";

const initialState = {
  isRequest: false,
  isRequestFailed: false,
  error: null,
  ingredients: [],
  totalPrice: 0,
};

// sorts an array to [bun, ...noBuns, bun]
const sortIngredients = (ingredientsWithNew: Ingredient[]) => {
  const sortedIngredients = [...ingredientsWithNew];
  const bun = sortedIngredients.find((ingredient) => ingredient.type === "bun");
  const nonBuns = sortedIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  return [bun, ...nonBuns, bun].filter(Boolean);
};

export const constructorReducer = (
  state = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case GET_CONSTRUCTOR_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS_FAIL: {
      return {
        ...state,
        isRequest: false,
        isRequestFailed: true,
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        details: action.ingredients,
        isRequest: false,
        isRequestFailed: false,
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }
    case SET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const currentIngredientsWithNewOne =
        action.ingredient.type === "bun"
          ? [
              ...state.ingredients.filter(
                (ingredient: any) => ingredient.type !== "bun"
              ),
              action.ingredient,
            ]
          : [...state.ingredients, action.ingredient];
      return {
        ...state,
        ingredients: sortIngredients(currentIngredientsWithNewOne),
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.index, 1);
      return {
        ...state,
        ingredients,
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.hoverIndex,
        0,
        ingredients.splice(action.dragIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: sortIngredients(ingredients),
      };
    }
    default: {
      return state;
    }
  }
};
