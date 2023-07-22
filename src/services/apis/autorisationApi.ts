import { checkResponse } from "../helpers";

export const checkEmail = (email: string) => {
  fetch("https://norma.nomoreparties.space/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) =>
    checkResponse(res).catch((err: Error) => console.error(err))
  );
};
