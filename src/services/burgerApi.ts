const ingredientsUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

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
