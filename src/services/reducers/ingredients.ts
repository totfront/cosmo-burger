import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_INGREDIENTS_FAIL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  SELECT_BUNS_TAB,
  SELECT_INNERS_TAB,
  SELECT_SAUCES_TAB,
} from "../actions/ingredients";

const initialState = {
  tabs: {
    buns: "Булки",
    sauces: "Соусы",
    inners: "Начинки",
  },
  ingredients: {
    buns: [],
    sauces: [],
    inners: [],
  },
  isRequested: false,
  isRequestFailed: false,

  error: null,
  currentTab: "Булки",
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
        ingredients: action.ingredients,
        isRequest: false,
        isRequestFailed: false,
      };
    }
    case SELECT_BUNS_TAB: {
      return {
        ...state,
        currentTab: initialState.tabs.buns,
      };
    }
    case SELECT_INNERS_TAB: {
      return {
        ...state,
        currentTab: initialState.tabs.inners,
      };
    }
    case SELECT_SAUCES_TAB: {
      return {
        ...state,
        currentTab: initialState.tabs.sauces,
      };
    }

    default: {
      return state;
    }
  }
};
