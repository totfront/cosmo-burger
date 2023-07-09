import { SortedIngredients } from "./SortedIngredients";

export type Constructor = {
  isRequest: boolean;
  isRequestFailed: boolean;
  error: unknown;
  ingredients: SortedIngredients;
  totalPrice: 0;
};
