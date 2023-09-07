import { SET_USER_FAIL } from "../../../services/userAuth";
import { CLEAN_CONSTRUCTOR } from "../../actions/constructor";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../../actions/orderConfirmationModal";
import {
  initialState,
  orderConfirmationModalReducer,
} from "./orderConfirmationModal";

describe("order confirmation modal reducer", () => {
  it("returns initial state if wrong action, no action or none of those have been passed", () => {
    expect(
      orderConfirmationModalReducer(undefined, { type: CLEAN_CONSTRUCTOR })
    ).toEqual(initialState);
    expect(
      orderConfirmationModalReducer(initialState, { type: CLEAN_CONSTRUCTOR })
    ).toEqual(initialState);
    expect(
      orderConfirmationModalReducer(initialState, { type: SET_USER_FAIL })
    ).toEqual(initialState);
  });

  it("sets state with isRequest flag to true", () => {
    expect(
      orderConfirmationModalReducer(undefined, { type: SUBMIT_ORDER_REQUEST })
    ).toEqual({
      ...initialState,
      isRequest: true,
    });
  });
  it("sets state with isRequest to false, isRequestFailed to true and a passed error", () => {
    const error = new Error("test error");
    expect(
      orderConfirmationModalReducer(undefined, {
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
  it("sets state to initial with new passed name, and and isRequestSuccess to true", () => {
    const testData = {
      id: 123,
      name: "test",
    };
    expect(
      orderConfirmationModalReducer(undefined, {
        type: SUBMIT_ORDER_SUCCESS,
        ...testData,
      })
    ).toEqual({
      ...initialState,
      ...testData,
      isRequestSuccess: true,
    });
  });
});
