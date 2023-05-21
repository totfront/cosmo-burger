import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientModal: ingredientModalReducer,
  // orderModal:
});
