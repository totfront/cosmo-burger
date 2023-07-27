import { NewUser } from "../../shared/types/NewUser";
import {
  getUser,
  login,
  logout,
  refreshToken,
  registerUser,
} from "../apis/authorizationApi";
import { Dispatch, createContext, useContext } from "react";
import { ActionTypes } from "../../shared/types/Actions";
import { LoginData } from "../../shared/types/LoginData";
import { getCookie } from "../helpers";

export const LOGOUT = "LOGOUT";
export const ADD_NEW_USER = "ADD_NEW_USER";
export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAIL = "SET_USER_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const addNewUser =
  (newUser: NewUser) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: SET_USER_REQUEST });
    registerUser(newUser)
      .then(({ success, user, accessToken, refreshToken, message }) => {
        if (!success) throw new Error(message);
        const { name, email } = user;
        document.cookie = `accessToken=${accessToken}`;
        document.cookie = `refreshToken=${refreshToken}`;
        dispatch({ type: SET_USER_SUCCESS, name, email });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_USER_FAIL });
      });
  };

export const authorizeUser =
  (credentials: LoginData) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });
    login(credentials)
      .then(({ success, user, accessToken, refreshToken, message }) => {
        if (!success) throw new Error(message);

        const { name, email } = user;
        document.cookie = `refreshToken=${refreshToken}`;
        document.cookie = `accessToken=${accessToken}`;

        dispatch({
          type: LOGIN_SUCCESS,
          email,
          name,
          password: credentials.password,
        });
      })
      .catch((err: Error) => {
        console.error(err);
        dispatch({ type: LOGIN_FAIL });
      });
  };

export const getUserData = () => (dispatch: Dispatch<ActionTypes>) =>
  getUser()
    .then(({ success, user: { email, name }, accessToken, refreshToken }) => {
      if (!success) throw new Error(`Response contain { success: ${success}}`);
      document.cookie = `refreshToken=${refreshToken}; accessToken=${accessToken}`;
      dispatch({
        type: LOGIN_SUCCESS,
        email,
        name,
      });
    })
    .catch((err: Error) => {
      console.log(err);
      const token = getCookie("refreshToken");
      if (token) {
        refreshToken(token)
          .then((res) => {
            // if (!res?.success) {
            //   throw new Error(`Response contain { success: ${res?.success}}`);
            // }
            // document.cookie = `refreshToken=${refreshToken}; accessToken=${res.accessToken}`;
          })
          .catch((err: Error) => console.error(err));
      }
    });
export const logoutUser = () =>
  logout()
    .then(({ success, message }) => {
      if (!success)
        throw new Error(
          `Response contain { success: ${success}, message: ${message}}`
        );
      document.cookie = `refreshToken=; accessToken=`;
    })
    .catch((err: Error) => console.error(err));
