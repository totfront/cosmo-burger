import { checkResponse } from "../helpers";

const ingredientsUrl = "https://norma.nomoreparties.space/api";

const fetchData = () =>
  fetch(`${ingredientsUrl}/ingredients`).then((res) => checkResponse(res));

const sendOrder = (ingredients: string[]) =>
  fetch(`${ingredientsUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ingredients }),
  }).then((res) => checkResponse(res));

export { fetchData, sendOrder };
