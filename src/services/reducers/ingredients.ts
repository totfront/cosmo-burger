import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SELECT_BUNS_TAB,
  SELECT_INNERS_TAB,
  SELECT_SAUCES_TAB,
} from "../actions/ingredients";

const buns = "Булки";
const sauces = "Соусы";
const inners = "Начинки";

const initialState = {
  tabs: {
    buns,
    sauces,
    inners,
  },
  ingredients: {
    buns: [],
    sauces: [],
    inners: [],
  },
  currentTab: buns,
  isRequested: false,
  isRequestFailed: false,
  error: null,
};

export const ingredientsReducer = (
  state = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case GET_INGREDIENTS_FAIL: {
      return {
        ...state,
        isRequest: false,
        isRequestFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        isRequestFailed: false,
        ingredients: action.ingredients,
      };
    }
    case SELECT_BUNS_TAB: {
      return {
        ...state,
        currentTab: buns,
      };
    }
    case SELECT_INNERS_TAB: {
      return {
        ...state,
        currentTab: inners,
      };
    }
    case SELECT_SAUCES_TAB: {
      return {
        ...state,
        currentTab: sauces,
      };
    }

    default: {
      return state;
    }
  }
};
