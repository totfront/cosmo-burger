import { feedReducer } from "./feed";
import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientModalReducer } from "./ingredientModal";
import { constructorReducer } from "./constructor";
import { orderConfirmationModal } from "./orderConfirmationModal";
import { userReducer } from "./userReducer";
import { orderDetailsModalReducer } from "./orderDetailsModal";
import { ordersHistoryReducer } from "./ordersHistory";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderConstructor: constructorReducer,
  ingredientModal: ingredientModalReducer,
  orderDetailsModal: orderDetailsModalReducer,
  orderConfirmationModal: orderConfirmationModal,
  user: userReducer,
  feed: feedReducer,
  ordersHistory: ordersHistoryReducer,
});
