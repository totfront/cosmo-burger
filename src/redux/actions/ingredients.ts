import { fetchData } from "../../services/apis/burgerApi";
import { getIdFromPath, sortIngredients } from "../../services/helpers";
import { AppDispatch } from "../../shared/hooks/types/AppDispatch";
import { ingredientsPath } from "../../shared/paths";
import { Ingredient } from "../../shared/types/Ingredient";
import { SHOW_INGREDIENT_MODAL } from "./ingredientModal";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => (dispatch: AppDispatch) => {
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
      const modalIngredientId = getIdFromPath(location.pathname);
      const getUrlIdIngredient = Object.values(data).find(
        (i) => i._id === modalIngredientId
      );
      if (
        location.pathname.includes(`${ingredientsPath}/${modalIngredientId}`) &&
        getUrlIdIngredient !== undefined
      ) {
        dispatch({
          type: SHOW_INGREDIENT_MODAL,
          ingredient: getUrlIdIngredient,
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

export const SWITCH_TAB = "SWITCH_TAB";
export const SELECT_BUNS_TAB = "SELECT_ITEMS_TAB";
export const SELECT_INNERS_TAB = "SELECT_INNERS_TAB";
export const SELECT_SAUCES_TAB = "SELECT_SAUCES_TAB";
export const switchTabActionCreator = (tabKey: string) => {
  let result = SELECT_INNERS_TAB;
  switch (tabKey) {
    case "buns":
      result = SELECT_BUNS_TAB;
      break;
    case "sauces":
      result = SELECT_SAUCES_TAB;
      break;
  }
  return result;
};

export const INCREASE_INGREDIENTS_COUNTER = "INCREASE_INGREDIENTS_COUNTER";
export const DECREASE_INGREDIENTS_COUNTER = "SET_DRAGGING_INGREDIENT";
