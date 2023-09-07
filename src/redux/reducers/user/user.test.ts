import {
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_USER_FAIL,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../../../services/userAuth";
import { TActions } from "../../../shared/types/Actions";
import { userReducer, initialState } from "./user";

describe("userReducer", () => {
  it("handles logout action", () => {
    const expectedState = initialState;
    expect(userReducer(initialState, { type: LOGOUT })).toEqual(expectedState);
  });

  it("handles set user request action", () => {
    const expectedState = { ...initialState, isSetUserRequest: true };
    expect(userReducer(initialState, { type: SET_USER_REQUEST })).toEqual(
      expectedState
    );
  });

  it("handles set user fail action", () => {
    const expectedState = {
      ...initialState,
      isSetUserRequest: false,
      isSetUserRequestFail: true,
    };
    expect(userReducer(initialState, { type: SET_USER_FAIL })).toEqual(
      expectedState
    );
  });

  it("handles set user success action", () => {
    const expectedState = {
      ...initialState,
      isSetUserRequestFail: false,
      isSetUserRequest: false,
      name: "John",
      email: "john@example.com",
    };
    expect(
      userReducer(initialState, {
        type: SET_USER_SUCCESS,
        name: "John",
        email: "john@example.com",
      })
    ).toEqual(expectedState);
  });

  it("handles login request action", () => {
    const expectedState = { ...initialState, isLoginRequest: true };
    expect(userReducer(initialState, { type: LOGIN_REQUEST })).toEqual(
      expectedState
    );
  });

  it("handles login fail action", () => {
    const expectedState = {
      ...initialState,
      isLoginRequest: false,
      isLoginRequestFail: true,
    };
    expect(userReducer(initialState, { type: LOGIN_FAIL })).toEqual(
      expectedState
    );
  });

  it("handles login success action", () => {
    const expectedState = {
      ...initialState,
      isLoginRequest: false,
      isLoginRequestFail: false,
      isAuthorized: true,
      name: "John",
      email: "john@example.com",
      password: "qwerty",
    };
    expect(
      userReducer(initialState, {
        type: LOGIN_SUCCESS,
        name: "John",
        email: "john@example.com",
        password: "qwerty",
      })
    ).toEqual(expectedState);
  });

  it("handles unknown action type", () => {
    expect(
      userReducer(initialState, {
        type: "UNKNOWN_ACTION",
      } as unknown as TActions)
    ).toEqual(initialState);
  });
});
