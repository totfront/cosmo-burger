import { checkResponse } from "../helpers";

const url = "https://norma.nomoreparties.space/api";

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

export const registerUser = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );
};
