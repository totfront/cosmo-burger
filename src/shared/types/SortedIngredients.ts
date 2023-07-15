import { Ingredient } from "./Ingredient";

export type SortedIngredients = {
  buns: Ingredient[] & { count?: number };
  sauces: Ingredient[] & { count?: number };
  inners: Ingredient[] & { count?: number };
};
