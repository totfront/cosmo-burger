import { SortedIngredients } from "./SortedIngredients";

type Tabs = {
  buns: string;
  sauces: string;
  inners: string;
};

export type Ingredients = {
  ingredients: SortedIngredients;
  error: unknown;
  tabs: Tabs;
  isRequested: boolean;
  isRequestFailed: boolean;
};
