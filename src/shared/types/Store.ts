import { SortedIngredients } from "./SortedIngredients";
import { IngredientModal } from "./IngredientModal";

type Tabs = {
  buns: string;
  sauces: string;
  inners: string;
};

export type Store = {
  ingredients: {
    ingredients: SortedIngredients;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    currentTab: keyof Tabs;
    error: string | null;
    tabs: Tabs;
  };
  ingredientModal: IngredientModal;
};
