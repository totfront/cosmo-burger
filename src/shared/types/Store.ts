import { IngredientModal } from "./IngredientModal";
import { Constructor } from "./Constructor";
import { OrderDetails } from "./OrderDetails";
import { Ingredients } from "./Ingredients";

export type Store = {
  ingredients: Ingredients;
  ingredientModal: IngredientModal;
  orderConstructor: Constructor;
  orderDetails: OrderDetails;
};
