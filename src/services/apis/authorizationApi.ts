import { LoginData } from "../../shared/types/LoginData";
import { NewUser } from "../../shared/types/NewUser";
import { PasswordResetData } from "../../shared/types/PasswordResetData";
import { checkResponse, getCookie } from "../helpers";

const url = "https://norma.nomoreparties.space/api";

export const getUser = (token = "") =>
  fetch(`${url}/auth/user`, {
    headers: {
      authorization: token,
    },
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );

export const checkEmail = (email: string) => {
  fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );
};

export const registerUser = ({ name, email, password }: NewUser) =>
  fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );

export const logout = () =>
  fetch(`${url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );

export const login = ({ email, password }: LoginData) =>
  fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );

export const resetPassword = ({ password, token }: PasswordResetData) =>
  fetch(`${url}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );

export const refreshToken = (token = "") =>
  fetch(`${url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );
