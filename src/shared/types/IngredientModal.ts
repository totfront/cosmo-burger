import { Ingredient } from "./Ingredient";

export type IngredientModal = {
  isModalShown: boolean;
  selectedIngredient: Ingredient | null;
};
