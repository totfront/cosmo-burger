import { SortedIngredients } from "./SortedIngredients";
import { IngredientModal } from "./IngredientModal";
import { Constructor } from "./Constructor";
import { OrderDetails } from "./OrderDetails";

type Tabs = {
  buns: string;
  sauces: string;
  inners: string;
};

export type Store = {
  ingredients: {
    ingredients: SortedIngredients;
    isRequest: boolean;
    ingredientsFailed: boolean;
    currentTab: keyof Tabs;
    error: string | null;
    tabs: Tabs;
  };
  ingredientModal: IngredientModal;
  orderConstructor: Constructor;
  orderDetails: OrderDetails;
};
