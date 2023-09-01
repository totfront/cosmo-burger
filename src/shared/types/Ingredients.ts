import { SortedIngredients } from "./SortedIngredients";

type Tabs = {
  buns: string;
  sauces: string;
  inners: string;
};

export type Ingredients = {
  // todo: replace with usual ingredients and sort where it is needed
  ingredients: SortedIngredients;
  error: unknown;
  tabs: Tabs;
  isRequested: boolean;
  isRequestFailed: boolean;
};
