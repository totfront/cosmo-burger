import { ActionTypes } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";

export type OrderState = typeof initialState;

const initialState = {
  id: 0,
  name: "",
  isModalShown: false,
  isRequest: false,
  isRequestFailed: false,
  isRequestSuccess: false,
  error: null,
};

const orderReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case SUBMIT_ORDER_FAIL: {
      return {
        ...state,
        isRequest: false,
        isRequestFailed: true,
      };
    }
    case SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        isRequest: false,
        isRequestSuccess: true,
        id: action.id,
        name: action.name,
      };
    }
    default: {
      return state;
    }
  }
};

export { orderReducer };
