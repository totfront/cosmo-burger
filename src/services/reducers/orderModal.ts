import { ActionTypes } from "../../shared/types/Actions";
import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../actions/order";

export type OrderState = typeof initialState;

const initialState = {
  id: 123,
  isModalShown: false,
  isOrderSubmitted: false,
  isRequest: false,
  isRequestFailed: false,
  error: null,
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
        isRequest: false,
        isRequestFailed: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { orderReducer };
