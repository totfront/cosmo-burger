import { Dispatch } from "react";
import { fetchData } from "../burgerApi";
import { ActionTypes } from "../../shared/types/Actions";
import { sortIngredients } from "../helpers";

// ingredient items request actions:
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  fetchData()
    .then(({ data }) => {
      const sortedIngredients = sortIngredients(data);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: sortedIngredients,
      });
    })
    .catch((error) => {
      console.error(`Ingredients request failed with error: ${error}`);
      dispatch({
        type: GET_INGREDIENTS_ERROR,
        error,
      });
    });
};

// tab switch actions:
export const SWITCH_TAB = "SWITCH_TAB";
export const SELECT_BUNS_TAB = "SELECT_ITEMS_TAB";
export const SELECT_INNERS_TAB = "SELECT_INNERS_TAB";
export const SELECT_SAUCES_TAB = "SELECT_SAUCES_TAB";
export const switchTabActionCreator = (tabKey: string) => {
  let result;
  switch (tabKey) {
    case "buns":
      result = SELECT_BUNS_TAB;
      break;
    case "sauces":
      result = SELECT_SAUCES_TAB;
      break;
    case "inners":
      result = SELECT_INNERS_TAB;
      break;
  }
  return result;
};

// counter actions:
export const INCREASE_INGREDIENTS_COUNTER = "INCREASE_INGREDIENTS_COUNTER";
export const DECREASE_INGREDIENTS_COUNTER = "SET_DRAGGING_INGREDIENT";
