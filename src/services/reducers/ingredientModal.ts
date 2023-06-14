import { ActionTypes } from "../../shared/types/Actions";
import { IngredientModal } from "../../shared/types/IngredientModal";
import {
  HIDE_INGREDIENT_MODAL,
  SET_MODAL_INGREDIENT,
  SHOW_INGREDIENT_MODAL,
} from "../actions/ingredientModal";

const initialState: IngredientModal = {
  isModalShown: false,
  selectedIngredient: {
    name: "",
    image: "",
    calories: 0,
    fat: 0,
    proteins: 0,
    carbohydrates: 0,
    _id: "",
    type: "",
    price: 0,
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
};

export const ingredientModalReducer = (
  state = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_MODAL_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.ingredient,
      };
    }
    case SHOW_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalShown: true,
      };
    }
    case HIDE_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalShown: false,
      };
    }
    default: {
      return state;
    }
  }
};
