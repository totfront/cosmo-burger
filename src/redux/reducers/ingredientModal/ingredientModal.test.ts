import { TActions } from "../../../shared/types/Actions";
import {
  HIDE_INGREDIENT_MODAL,
  SHOW_INGREDIENT_MODAL,
} from "../../actions/ingredientModal";
import { ingredientModalReducer, initialState } from "./ingredientModal"; // Import initialState from your reducer file

describe("ingredientModal reducer", () => {
  it("handles initial state", () => {
    expect(
      ingredientModalReducer(undefined, {} as unknown as TActions)
    ).toEqual(initialState);
  });

  it("handles show modal action", () => {
    const ingredient = {
      _id: "1",
      name: "Test Ingredient",
      type: "type",
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 100,
      price: 2.99,
      image: "image.jpg",
      image_mobile: "image_mobile.jpg",
      image_large: "image_large.jpg",
      __v: 1,
    };

    const expectedState = {
      isModalShown: true,
      selectedIngredient: ingredient,
    };

    expect(
      ingredientModalReducer(initialState, {
        type: SHOW_INGREDIENT_MODAL,
        ingredient,
      })
    ).toEqual(expectedState);
  });

  it("handles hide modal action", () => {
    const expectedState = {
      isModalShown: false,
      selectedIngredient: initialState.selectedIngredient,
    };

    expect(
      ingredientModalReducer(initialState, {
        type: HIDE_INGREDIENT_MODAL,
      })
    ).toEqual(expectedState);
  });
});
