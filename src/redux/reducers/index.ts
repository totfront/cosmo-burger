import { feedReducer } from "./feed/feed";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/ingredients";
import { ingredientModalReducer } from "./ingredientModal/ingredientModal";
import { constructorReducer } from "./constructor/constructor";
import { orderConfirmationModalReducer } from "./orderConfirmationModal/orderConfirmationModal";
import { userReducer } from "./user/user";
import { orderDetailsModalReducer } from "./orderDetailsModal/orderDetailsModal";
import { ordersHistoryReducer } from "./ordersHistory/ordersHistory";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderConstructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  orderDetailsModal: orderDetailsModalReducer,
  orderConfirmationModal: orderConfirmationModalReducer,
  user: userReducer,
  feed: feedReducer,
  ordersHistory: ordersHistoryReducer,
});
