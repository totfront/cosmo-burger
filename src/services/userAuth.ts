import { NewUser } from "../shared/types/NewUser";
import {
  getUser,
  login,
  logout,
  refreshToken,
  registerUser,
} from "./apis/authorizationApi";
import { LoginData } from "../shared/types/LoginData";
import { getCookie, setCookie } from "./helpers";
import { NavigateFunction } from "react-router-dom";
import { defaultPath, loginPath } from "../shared/paths";
import { accessToken } from "../shared/names";
import { AppDispatch } from "../shared/hooks/types/AppDispatch";

export const LOGOUT = "LOGOUT";
export const ADD_NEW_USER = "ADD_NEW_USER";
export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAIL = "SET_USER_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const addNewUser =
  (newUser: NewUser, navigate: NavigateFunction) => (dispatch: AppDispatch) => {
    dispatch({ type: SET_USER_REQUEST });
    registerUser(newUser)
      .then(({ success, user, accessToken, refreshToken, message }) => {
        if (!success) throw new Error(message);
        const { name, email } = user;
        setCookie("refreshToken", refreshToken, { path: defaultPath });
        setCookie("accessToken", accessToken, { path: defaultPath });

        dispatch({ type: SET_USER_SUCCESS, name, email });
        navigate(loginPath);
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: SET_USER_FAIL });
      });
  };

export const authorizeUser =
  (credentials: LoginData) => (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    login(credentials)
      .then(({ user, accessToken, refreshToken }) => {
        const { name, email } = user;
        setCookie("refreshToken", refreshToken, { path: defaultPath });
        setCookie("accessToken", accessToken, { path: defaultPath });
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

export const getUserData = () => (dispatch: AppDispatch) => {
  const token = getCookie(accessToken);
  getUser(token)
    .then(({ user: { email, name } }) => {
      dispatch({
        type: LOGIN_SUCCESS,
        email,
        name,
      });
    })
    .catch(async (err) => {
      if (err.message === "jwt expired") {
        try {
          const { accessToken, refreshToken: newRefreshToken } =
            await refreshToken();
          setCookie("refreshToken", newRefreshToken, { path: defaultPath });
          setCookie("accessToken", accessToken, { path: defaultPath });

          try {
            const {
              user: { email, name },
            } = await getUser(accessToken);

            dispatch({
              type: LOGIN_SUCCESS,
              email,
              name,
            });
          } catch (innerErr) {
            console.error("Failed to get user:", innerErr);
          }
        } catch (refreshErr) {
          console.error("Update token request failed:", refreshErr);
        }
      } else {
        console.error("Request to get user is not successful:", err);
      }
    });
};

export const logoutUser = () => (dispatch: AppDispatch) =>
  logout()
    .then(({ success, message }) => {
      if (!success) {
        throw new Error(
          `Response contain { success: ${success}, message: ${message}}`
        );
      }
      setCookie("refreshToken", "", { path: defaultPath });
      setCookie("accessToken", "", { path: defaultPath });
      dispatch({ type: LOGOUT });
    })
    .catch((err: Error) => console.error(err));
