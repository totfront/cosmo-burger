import { feedReducer } from "./feed";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./orderModal";
import { userReducer } from "./userReducer";
import { orderDetailsModalReducer } from "./orderDetailsModal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderConstructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  orderDetailsModal: orderDetailsModalReducer,
  orderDetails: orderReducer,
  user: userReducer,
  feed: feedReducer,
});
