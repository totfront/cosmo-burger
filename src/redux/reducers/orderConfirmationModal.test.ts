import { SET_USER_FAIL } from "../../services/userAuth";
import { CLEAN_CONSTRUCTOR } from "../actions/constructor";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/orderConfirmationModal";
import { initialState, orderConfirmationModal } from "./orderConfirmationModal";

describe("order confirmation modal reducer", () => {
  it("returns initial state if wrong action, no action or none of those have been passed", () => {
    expect(
      orderConfirmationModal(undefined, { type: CLEAN_CONSTRUCTOR })
    ).toEqual(initialState);
    expect(
      orderConfirmationModal(initialState, { type: CLEAN_CONSTRUCTOR })
    ).toEqual(initialState);
    expect(
      orderConfirmationModal(initialState, { type: SET_USER_FAIL })
    ).toEqual(initialState);
  });

  it("sets state with isRequest flag to true", () => {
    expect(
      orderConfirmationModal(undefined, { type: SUBMIT_ORDER_REQUEST })
    ).toEqual({
      ...initialState,
      isRequest: true,
    });
  });
  it("sets state with isRequest to false, isRequestFailed to true and a passed error", () => {
    const error = new Error("test error");
    expect(
      orderConfirmationModal(undefined, {
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
      orderConfirmationModal(undefined, {
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
