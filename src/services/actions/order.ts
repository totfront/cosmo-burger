import { Dispatch } from "react";
import { ActionTypes } from "../../shared/types/Actions";
import { sendOrder } from "../burgerApi";

export const SUBMIT_ORDER_REQUEST = "SUBMIT_ORDER_REQUEST";
export const SUBMIT_ORDER_FAIL = "SUBMIT_ORDER_FAIL";
export const SUBMIT_ORDER_SUCCESS = "SUBMIT_ORDER_SUCCESS";

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
