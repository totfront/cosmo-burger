import { ActionTypes } from "../../shared/types/Actions";
import {
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_USER_FAIL,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../../services/userAuth";

export type UserState = typeof initialState;

const initialState = {
  name: "",
  email: "",
  password: "",
  isAuthorized: false,
  isLoginRequest: false,
  isLoginRequestFail: false,
  isSetUserRequest: false,
  isSetUserRequestFail: false,
};

const userReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case SET_USER_REQUEST: {
      return { ...state, isSetUserRequest: true };
    }
    case SET_USER_FAIL: {
      return { ...state, isSetUserRequest: false, isSetUserRequestFail: true };
    }
    case SET_USER_SUCCESS: {
      const { name, email } = action;
      return {
        ...state,
        isSetUserRequestFail: false,
        isSetUserRequest: false,
        name,
        email,
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, isLoginRequest: true };
    }
    case LOGIN_FAIL: {
      return { ...state, isLoginRequest: false, isLoginRequestFail: true };
    }
    case LOGIN_SUCCESS: {
      const { name, email, password = "qwerty" } = action;
      return {
        ...state,
        isLoginRequest: false,
        isLoginRequestFail: false,
        isAuthorized: true,
        name,
        email,
        password,
      };
    }
    default: {
      return state;
    }
  }
};

export { userReducer };
