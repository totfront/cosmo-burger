import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./orderModal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderConstructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  orderDetails: orderReducer,
});
