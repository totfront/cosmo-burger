import { feedReducer } from "./feed";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./orderModal";
import { userReducer } from "./userReducer";
import { orderDetailsModalReducer } from "./orderDetailsModal";
import { ordersHistoryReducer } from "./ordersHistory";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderConstructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  orderDetailsModal: orderDetailsModalReducer,
  orderDetails: orderReducer,
  user: userReducer,
  feed: feedReducer,
  ordersHistory: ordersHistoryReducer,
});
