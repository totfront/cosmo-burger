import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_CONSTRUCTOR_INGREDIENTS_REQUEST,
  GET_CONSTRUCTOR_INGREDIENTS_FAIL,
  GET_CONSTRUCTOR_INGREDIENTS_SUCCESS,
} from "../actions/constructor";

const initialState = {
  isRequest: false,
  isRequestFailed: false,
  error: null,
  ingredients: {
    buns: [],
    inners: [],
    sauces: [],
  },
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

    default: {
      return state;
    }
  }
};
