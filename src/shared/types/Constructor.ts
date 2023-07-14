import { Ingredient } from "./Ingredient";

export type Constructor = {
  isRequest: boolean;
  isRequestFailed: boolean;
  error: unknown;
  ingredients: Ingredient[];
  totalPrice: 0;
};
