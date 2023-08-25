import { NoMorePartiesUrl } from "../../shared/paths";
import { LoginData } from "../../shared/types/LoginData";
import { NewUser } from "../../shared/types/NewUser";
import { PasswordResetData } from "../../shared/types/PasswordResetData";
import { checkResponse, getCookie } from "../helpers";

export const getUser = (token = "") =>
  fetch(`${NoMorePartiesUrl}/auth/user`, {
    headers: {
      authorization: token,
    },
  }).then((res) => checkResponse(res));

export const checkEmail = (email: string) => {
  fetch(`${NoMorePartiesUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => checkResponse(res));
};

export const registerUser = ({ name, email, password }: NewUser) =>
  fetch(`${NoMorePartiesUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));

export const logout = () =>
  fetch(`${NoMorePartiesUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then((res) => checkResponse(res));

export const login = ({ email, password }: LoginData) =>
  fetch(`${NoMorePartiesUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));

export const resetPassword = ({ password, token }: PasswordResetData) =>
  fetch(`${NoMorePartiesUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then((res) => checkResponse(res));

export const refreshToken = (token = "") =>
  fetch(`${NoMorePartiesUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((res) => checkResponse(res));
