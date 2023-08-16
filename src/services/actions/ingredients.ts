import { Dispatch } from "react";
import { fetchData } from "../apis/burgerApi";
import { ActionTypes } from "../../shared/types/Actions";
import { getIdFromPath, sortIngredients } from "../helpers";
import { ingredientsPath } from "../../shared/paths";
import { Ingredient } from "../../shared/types/Ingredient";
import { HIDE_HOME_PAGE, SHOW_INGREDIENT_MODAL } from "./ingredientModal";

// ingredient items request actions:
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => (dispatch: Dispatch<ActionTypes>) => {
  const { location } = window;
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  fetchData()
    .then(({ data }: { data: Ingredient[] }) => {
      const sortedIngredients = sortIngredients(data);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: sortedIngredients,
      });
      const ingredientsBasedOnUrl = Object.values(data).find(
        (i) => i._id === getIdFromPath(location.pathname)
      );
      if (
        location.pathname.includes(`${ingredientsPath}/`) &&
        ingredientsBasedOnUrl !== undefined
      ) {
        dispatch({ type: HIDE_HOME_PAGE });
        dispatch({
          type: SHOW_INGREDIENT_MODAL,
          ingredient: ingredientsBasedOnUrl,
        });
      }
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
