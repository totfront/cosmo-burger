import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";
import { constructorReducer } from "./constructor";
import orderReducer from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  order: orderReducer,
});
