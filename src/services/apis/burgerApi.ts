import { Dispatch } from "react";
import { checkResponse, getCookie } from "../helpers";
import { TActions } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../../redux/actions/order";
import { noMorePartiesApiUrl } from "../../shared/paths";
import { accessToken } from "../../shared/names";

const token = getCookie(accessToken);

const fetchData = () =>
  fetch(`${noMorePartiesApiUrl}/ingredients`).then((res) => checkResponse(res));

const sendOrder = (ingredients: string[]) =>
  fetch(`${noMorePartiesApiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ ingredients }),
  }).then((res) => checkResponse(res));

export const submitOrder =
  (ingredientsIds: string[]) => (dispatch: Dispatch<TActions>) => {
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
