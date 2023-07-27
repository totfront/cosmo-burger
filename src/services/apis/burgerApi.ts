import { Dispatch } from "react";
import { checkResponse } from "../helpers";
import { ActionTypes } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";

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

export const submitOrder =
  (ingredientsIds: string[]) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: SUBMIT_ORDER_REQUEST,
    });
    sendOrder(ingredientsIds)
      .then(({ order, name }) => {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          id: order.number,
          name: name,
        });
      })
      .catch((error) => {
        console.error(`Submit order request failed with error: ${error}`);
        dispatch({
          type: SUBMIT_ORDER_FAIL,
          error,
        });
      });
  };

export { fetchData };
