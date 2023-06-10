import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../actions/order";

export type OrderState = typeof initialState;
export type OrderDetails = typeof initialState.details;

const initialState = {
  isModalShown: false,
  isOrderSubmitted: false,
  isRequest: false,
  isRequestFailed: false,
  error: null,
  details: {
    ingredients: [
      {
        name: "",
        price: 0,
      },
    ],
  },
  id: 123,
};

const orderReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case GET_ORDER_FAIL: {
      return {
        ...state,
        isRequest: false,
        isRequestFailed: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        details: action.details,
        isRequest: false,
        isRequestFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
