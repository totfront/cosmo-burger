import { TActions } from "../../shared/types/Actions";
import { OrderDetails } from "../../shared/types/OrderDetails";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";

export const initialState: OrderDetails = {
  id: 0,
  name: "",
  isModalShown: false,
  isRequest: false,
  isRequestFailed: false,
  isRequestSuccess: false,
  error: null,
};

const orderReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SUBMIT_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case SUBMIT_ORDER_FAIL: {
      return {
        ...initialState,
        isRequest: false,
        isRequestFailed: true,
        error: action.error,
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
