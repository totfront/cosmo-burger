import { IngredientModal } from "./IngredientModal";
import { Constructor } from "./Constructor";
import { OrderDetails } from "./OrderDetails";
import { Ingredients } from "./Ingredients";
import { UserState } from "../../redux/reducers/userReducer";
import { Order, OrdersResponse } from "../../redux/types/dataModels";

export type State = {
  ingredients: Ingredients;
  ingredientModal: IngredientModal;
  orderConstructor: Constructor;
  orderDetails: OrderDetails;
  user: UserState;
  feed: OrdersResponse;
  ordersHistory: OrdersResponse;
  orderDetailsModal: Order;
};
