import { refreshToken as refrToken } from "./../../shared/names";
import { noMorePartiesApiUrl } from "../../shared/paths";
import { LoginData } from "../../shared/types/LoginData";
import { NewUser } from "../../shared/types/NewUser";
import { PasswordResetData } from "../../shared/types/PasswordResetData";
import { checkResponse, getCookie } from "../helpers";

export const getUser = (token = "") =>
  fetch(`${noMorePartiesApiUrl}/auth/user`, {
    headers: {
      authorization: token,
    },
  }).then((res) => checkResponse(res));

export const checkEmail = (email: string) => {
  fetch(`${noMorePartiesApiUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => checkResponse(res));
};

export const registerUser = ({ name, email, password }: NewUser) =>
  fetch(`${noMorePartiesApiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));

export const logout = () =>
  fetch(`${noMorePartiesApiUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie(refrToken) }),
  }).then((res) => checkResponse(res));

export const login = ({ email, password }: LoginData) =>
  fetch(`${noMorePartiesApiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));

export const resetPassword = ({ password, token }: PasswordResetData) =>
  fetch(`${noMorePartiesApiUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then((res) => checkResponse(res));

export const refreshToken = async () => {
  const res = await fetch(`${noMorePartiesApiUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: getCookie(refrToken),
    }),
  });
  return await checkResponse(res);
};
