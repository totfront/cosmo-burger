import { TActions } from "../../../shared/types/Actions";
import { Ingredient } from "../../../shared/types/Ingredient";
import { v4 as uuid } from "uuid";
import {
  SET_TOTAL_PRICE,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  CLEAN_CONSTRUCTOR,
} from "../../actions/constructor";
import { Constructor } from "../../../shared/types/Constructor";

export const initialState: Constructor = {
  isRequest: false,
  isRequestFailed: false,
  error: null,
  ingredients: [],
  totalPrice: 0,
};

// sorts an array to [bun, ...noBuns, bun]
const sortIngredients = (ingredientsWithNew: Ingredient[]) => {
  const sortedIngredients = [...ingredientsWithNew];
  const bun = sortedIngredients.find((ingredient) => ingredient.type === "bun");
  const nonBuns = sortedIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );
  return [bun, ...nonBuns, bun].filter(Boolean);
};

export const constructorReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice,
      };
    }
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const currentIngredientsWithNewOne =
        action.ingredient.type === "bun"
          ? [
              ...state.ingredients.filter(
                (ingredient: Ingredient) => ingredient.type !== "bun"
              ),
              { ...action.ingredient, uuid: uuid() },
            ]
          : [...state.ingredients, { ...action.ingredient, uuid: uuid() }];
      return {
        ...state,
        ingredients: sortIngredients(currentIngredientsWithNewOne),
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.index, 1);
      return {
        ...state,
        ingredients,
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.hoverIndex,
        0,
        ingredients.splice(action.dragIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: sortIngredients(ingredients),
      };
    }
    case CLEAN_CONSTRUCTOR:
      return initialState;
    default: {
      return { ...state };
    }
  }
};
