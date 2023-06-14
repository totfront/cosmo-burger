import { Dispatch } from "react";
import { Ingredient } from "../../shared/types/Ingredient";
import { fetchData } from "../burgerApi";
import { SortedIngredients } from "../../shared/types/SortedIngredients";
import { ActionTypes } from "../../shared/types/Actions";
import { SET_CONSTRUCTOR_INGREDIENTS } from "./constructor";

// ingredient items request actions:
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAIL = "GET_INGREDIENTS_FAIL";

// tab switch actions:
export const SELECT_BUNS_TAB = "SELECT_ITEMS_TAB";
export const SELECT_INNERS_TAB = "SELECT_INNERS_TAB";
export const SELECT_SAUCES_TAB = "SELECT_SAUCES_TAB";

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

const sortIngredients = (database: Ingredient[]): SortedIngredients => {
  const result: SortedIngredients = {
    buns: [],
    sauces: [],
    inners: [],
  };

  for (let i = 0; i < database.length; i++) {
    const itemName: string = database[i].name;
    if (itemName.includes("булка")) {
      result.buns.push(database[i]);
    } else if (itemName.includes("Соус")) {
      result.sauces.push(database[i]);
    } else {
      result.inners.push(database[i]);
    }
  }

  return result;
};

export const getIngredients = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  fetchData()
    .then((res) => checkResponse(res))
    .then(({ data }) => {
      const sortedIngredients = sortIngredients(data);
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: sortedIngredients,
      });
      dispatch({
        type: SET_CONSTRUCTOR_INGREDIENTS,
        ingredients: sortedIngredients,
      });
    })
    .catch((error) => {
      console.error(`Ingredients request failed with error: ${error}`);
      dispatch({
        type: GET_INGREDIENTS_FAIL,
        error,
      });
    });
};

export const selectBunsTab = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: SELECT_BUNS_TAB,
  });
};
export const selectInnersTab = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: SELECT_INNERS_TAB,
  });
};
export const selectSaucesTab = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch({
    type: SELECT_SAUCES_TAB,
  });
};
