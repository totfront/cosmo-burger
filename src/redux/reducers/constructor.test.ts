import { SET_USER_FAIL } from "../../services/userAuth";
import { CLEAN_CONSTRUCTOR } from "../actions/constructor";
import { SUBMIT_ORDER_FAIL, SUBMIT_ORDER_REQUEST } from "../actions/order";
import { initialState, orderReducer } from "./orderModal";

describe("order reducer", () => {
  it("should return initial state if wrong action, no action or none of those have been passed", () => {
    expect(orderReducer(undefined, { type: CLEAN_CONSTRUCTOR })).toEqual(
      initialState
    );
    expect(orderReducer(initialState, { type: CLEAN_CONSTRUCTOR })).toEqual(
      initialState
    );
    expect(orderReducer(initialState, { type: SET_USER_FAIL })).toEqual(
      initialState
    );
  });
  it("should set state with isRequest flag to true", () => {
    expect(orderReducer(undefined, { type: SUBMIT_ORDER_REQUEST })).toEqual({
      ...initialState,
      isRequest: true,
    });
  });
  it("should set state with isRequest to false and isRequestFailed to true", () => {
    const error = new Error("test error");
    expect(
      orderReducer(undefined, {
        type: SUBMIT_ORDER_FAIL,
        error,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isRequestFailed: true,
      error,
    });
  });
});
