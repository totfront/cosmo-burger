import { ActionTypes } from "../../shared/types/Actions";
import { GET_CONSTRUCTOR_INGREDIENTS } from "../actions/constructor";

const initialState = {
  ingredients: {
    buns: [],
    inners: [],
    sauces: [],
  },
};

export const ingredientsReducer = (
  state = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        ingredients: true,
      };
    }

    default: {
      return state;
    }
  }
};
