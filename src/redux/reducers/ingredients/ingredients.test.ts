import {
  DECREASE_INGREDIENTS_COUNTER,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENTS_COUNTER,
} from "../../actions/ingredients";
import { ingredientsReducer, initialState } from "./ingredients"; // Import initialState from your reducer file
import { Ingredients } from "../../../shared/types/Ingredients"; // Import the types
import { Ingredient } from "../../../shared/types/Ingredient";

const mockedIngredient = {
  name: "Test Ingredient",
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

const mockedBun = {
  ...mockedIngredient,
  _id: "1",
  type: "bun",
};

const mockedInner = {
  ...mockedIngredient,
  _id: "2",
  type: "inner",
};

const mockedSauce = {
  ...mockedIngredient,
  _id: "3",
  type: "sauce",
};

describe("ingredients reducer", () => {
  it("handles get ingredients action", () => {
    const expectedState: Ingredients = {
      ...initialState,
      isRequested: true,
    };
    expect(
      ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual(expectedState);
  });

  it("handles get ingredients error action", () => {
    const expectedState: Ingredients = {
      ...initialState,
      isRequested: false,
      isRequestFailed: false,
    };
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_ERROR,
        error: new Error("test-error"),
      })
    ).toEqual(expectedState);
  });

  it("handles get ingredients success action", () => {
    const ingredients: Ingredients["ingredients"] = {
      buns: [mockedBun],
      sauces: [mockedInner],
      inners: [mockedSauce],
    };
    const expectedState: Ingredients = {
      ...initialState,
      isRequested: false,
      isRequestFailed: false,
      ingredients,
    };
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients,
      })
    ).toEqual(expectedState);
  });

  const ingredients = {
    buns: [],
    inners: [{ ...mockedInner, counter: 2 }], // should increase[decrease] this ingredient
    sauces: [],
  };

  it("handles increase ingredient counter action", () => {
    const expectedState: Ingredients = {
      ...initialState,
      ingredients: { ...ingredients, inners: [{ ...mockedInner, counter: 3 }] },
    };
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients,
        },
        {
          type: INCREASE_INGREDIENTS_COUNTER,
          id: "2",
        }
      )
    ).toEqual(expectedState);
  });

  it("handles decrease ingredient counter action", () => {
    const expectedState: Ingredients = {
      ...initialState,
      ingredients: { ...ingredients, inners: [{ ...mockedInner, counter: 1 }] },
    };
    expect(
      ingredientsReducer(
        {
          ...initialState,
          ingredients,
        },
        {
          type: DECREASE_INGREDIENTS_COUNTER,
          id: "2",
        }
      )
    ).toEqual(expectedState);
  });
});
