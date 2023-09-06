import { SET_ORDER_DETAILS_MODAL } from "../../redux/actions/orderDetailsModal";
import { AppDispatch } from "../../shared/hooks/types/AppDispatch";
import { noMorePartiesApiUrl, ordersPath } from "../../shared/paths";
import { checkResponse } from "../helpers";

export const getOrder = (number: string) => (dispatch: AppDispatch) => {
  fetch(`${noMorePartiesApiUrl}${ordersPath}/${number}`)
    .then((res) => checkResponse(res))
    .then((res) => {
      dispatch({ type: SET_ORDER_DETAILS_MODAL, payload: res.orders[0] });
    })
    .catch((err: Error) =>
      console.error({
        message: "The order has not been found with an error",
        error: err,
      })
    );
};
