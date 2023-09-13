import { SET_USER_FAIL } from "../../../services/userAuth";
import {
  SET_TOTAL_PRICE,
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  CLEAN_CONSTRUCTOR,
} from "../../actions/constructor";
import { constructorReducer, initialState } from "./constructor";

const mockIngredient = {
  _id: "123",
  name: "test",
  proteins: 123,
  fat: 123,
  carbohydrates: 123,
  calories: 123,
  price: 123,
  image: "test",
  image_mobile: "test",
  image_large: "test",
  __v: 123,
};

const existingIngredients = [
  { ...mockIngredient, type: "sauce", uuid: expect.any(String) },
  { ...mockIngredient, type: "inner", uuid: expect.any(String) },
];

describe("constructor reducer", () => {
  it("handles initial state", () => {
    expect(constructorReducer(undefined, { type: SET_USER_FAIL })).toEqual(
      initialState
    );
  });

  it("sets total price", () => {
    const totalPrice = 123;
    expect(
      constructorReducer(undefined, { type: SET_TOTAL_PRICE, totalPrice })
    ).toEqual({
      ...initialState,
      totalPrice,
    });
  });

  it("adds a constructor ingredient (bun)", () => {
    const bunIngredient = {
      ...mockIngredient,
      type: "bun",
    };

    const expectedBunIngredient = {
      ...bunIngredient,
      uuid: expect.any(String),
    };

    expect(
      constructorReducer(undefined, {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ingredient: bunIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredients: [expectedBunIngredient, expectedBunIngredient],
    });
  });

  it("adds a constructor ingredient (non-bun)", () => {
    const nonBunIngredient = { ...mockIngredient, type: "sauce" };

    const stateWithIngredients = {
      ...initialState,
      ingredients: existingIngredients,
    };

    expect(
      constructorReducer(stateWithIngredients, {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ingredient: nonBunIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredients: [
        ...existingIngredients,
        { ...nonBunIngredient, uuid: expect.any(String) },
      ],
    });
  });

  it("removes a constructor ingredient", () => {
    const ingredientToRemove = { ...mockIngredient, type: "inner" };

    expect(
      constructorReducer(
        {
          ...initialState,
          ingredients: [...existingIngredients, { ...ingredientToRemove }],
        },
        {
          type: REMOVE_CONSTRUCTOR_INGREDIENT,
          index: 2,
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [...existingIngredients],
    });
  });

  it("moves a constructor ingredient", () => {
    const ingredientsToMove = [...existingIngredients];

    const dragIndex = 0; // Index of the ingredient to drag
    const hoverIndex = 1; // Index where the ingredient should be moved

    const expectedIngredients = [
      existingIngredients[1],
      existingIngredients[0],
    ];

    expect(
      constructorReducer(
        {
          ...initialState,
          ingredients: ingredientsToMove,
        },
        {
          type: MOVE_CONSTRUCTOR_INGREDIENT,
          dragIndex,
          hoverIndex,
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: expectedIngredients,
    });
  });

  it("cleans the constructor", () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [...existingIngredients],
    };

    expect(
      constructorReducer(stateWithIngredients, {
        type: CLEAN_CONSTRUCTOR,
      })
    ).toEqual(initialState);
  });
});
