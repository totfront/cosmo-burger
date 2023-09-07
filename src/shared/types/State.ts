import { IngredientModal } from "./IngredientModal";
import { Constructor } from "./Constructor";
import { TOrderConfirmationModal } from "./OrderConfirmationModal";
import { Ingredients } from "./Ingredients";
import { UserState } from "../../redux/reducers/user/user";
import { OrdersResponse } from "../../redux/types/dataModels";
import { rootReducer } from "../../redux/reducers";
import { TOrderDetailsModal } from "../../redux/reducers/orderDetailsModal/orderDetailsModal";

export type State = {
  ingredients: Ingredients;
  ingredientModal: IngredientModal;
  orderConstructor: Constructor;
  orderConfirmationModal: TOrderConfirmationModal;
  user: UserState;
  feed: OrdersResponse;
  ordersHistory: OrdersResponse;
  orderDetailsModal: TOrderDetailsModal;
};

export type RootState = ReturnType<typeof rootReducer>;
