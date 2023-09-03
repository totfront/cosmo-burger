import { Dispatch } from "react";
import { checkResponse, getCookie, setCookie } from "../helpers";
import { TActions } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../../redux/actions/order";
import { defaultPath, noMorePartiesApiUrl } from "../../shared/paths";
import { accessToken } from "../../shared/names";
import { getUser, refreshToken } from "./authorizationApi";
import { LOGIN_SUCCESS } from "../userAuth";

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
      .catch(async (error) => {
        if (error.message === "jwt expired") {
          try {
            const { accessToken, refreshToken: newRefreshToken } =
              await refreshToken();
            setCookie("refreshToken", newRefreshToken, { path: defaultPath });
            setCookie("accessToken", accessToken, { path: defaultPath });
            try {
              const {
                user: { email, name },
              } = await getUser(accessToken);
              dispatch({
                type: LOGIN_SUCCESS,
                email,
                name,
              });
            } catch (innerErr) {
              console.error("Failed to get user:", innerErr);
            }
          } catch (refreshErr) {
            console.error("Update token request failed:", refreshErr);
          }
          console.error(
            `Submit order request failed with error: ${error.message}`
          );
          dispatch({
            type: SUBMIT_ORDER_FAIL,
            error,
          });
        }
      });
  };

export { fetchData };
