import { ActionTypes } from "../../shared/types/Actions";
import { Ingredient } from "../../shared/types/Ingredient";
import { Ingredients } from "../../shared/types/Ingredients";
import {
  DECREASE_INGREDIENTS_COUNTER,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENTS_COUNTER,
} from "../actions/ingredients";
import { sortIngredients } from "../helpers";

const buns = "Булки";
const sauces = "Соусы";
const inners = "Начинки";

const initialState: Ingredients = {
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
        isRequested: true,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...initialState,
        isRequested: false,
        isRequestFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isRequested: false,
        isRequestFailed: false,
        ingredients: action.ingredients,
      };
    }
    case INCREASE_INGREDIENTS_COUNTER: {
      const ingredients = [
        ...state.ingredients.buns,
        ...state.ingredients.inners,
        ...state.ingredients.sauces,
      ];

      const ingredientsWithCounters = ingredients.map((ingredient) => {
        const { _id, counter, type } = ingredient;
        if (_id !== action.id) return ingredient;
        // prevents counter update if there is already a pair of same buns
        if (counter && counter > 0 && type === "bun") return ingredient;
        return {
          ...ingredient,
          counter: counter ? counter + 1 : 1,
        };
      });

      const checkIfTwoBunsHaveCounters = (ingredients: Ingredient[]) => {
        const allBuns = ingredients.filter((i) => i.type === "bun");
        // todo: cleanup the case if there are more than 2 buns
        if (
          allBuns[0].counter &&
          allBuns[0].counter > 0 &&
          allBuns[1].counter &&
          allBuns[1].counter > 0
        )
          return ingredients.map((i) => {
            if (i.type !== "bun") return i;
            if (i.counter && i.counter > 0 && i._id !== action.id) {
              return {
                ...i,
                counter: 0,
              };
            }
            return i;
          });
        return ingredients;
      };
      const newIngredients = sortIngredients(
        checkIfTwoBunsHaveCounters(ingredientsWithCounters)
      );
      return {
        ...state,
        ingredients: { ...newIngredients },
      };
    }
    case DECREASE_INGREDIENTS_COUNTER: {
      const ingredients = [
        ...state.ingredients.buns,
        ...state.ingredients.inners,
        ...state.ingredients.sauces,
      ];

      const ingredientsWithCounters = ingredients.map((ingredient) => {
        const { _id, counter } = ingredient;
        if (_id !== action.id) return ingredient;
        return {
          ...ingredient,
          counter: counter ? counter - 1 : 0,
        };
      });
      const newIngredients = sortIngredients(ingredientsWithCounters);

      return {
        ...state,
        ingredients: { ...newIngredients },
      };
    }
    default: {
      return state;
    }
  }
};
