import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_FAIL,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  SET_TOTAL_PRICE,
  SET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_INGREDIENT,
} from "../actions/constructor";

const initialState = {
  isRequest: false,
  isRequestFailed: false,
  error: null,
  ingredients: [],
  totalPrice: 0,
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
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    }
    default: {
      return state;
    }
  }
};
