import { Dispatch } from "react";
import { checkResponse } from "../helpers";
import { ActionTypes } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";
import { NoMorePartiesUrl } from "../../shared/paths";

const fetchData = () =>
  fetch(`${NoMorePartiesUrl}/ingredients`).then((res) => checkResponse(res));

const sendOrder = (ingredients: string[]) =>
  fetch(`${NoMorePartiesUrl}/orders`, {
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
