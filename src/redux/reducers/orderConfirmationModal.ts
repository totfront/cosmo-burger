import { TActions } from "../../shared/types/Actions";
import { TOrderConfirmationModal } from "../../shared/types/OrderConfirmationModal";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/orderConfirmationModal";

export const initialState: TOrderConfirmationModal = {
  id: 0,
  name: "",
  isModalShown: false,
  isRequest: false,
  isRequestFailed: false,
  isRequestSuccess: false,
  error: null,
};

const orderConfirmationModal = (state = initialState, action: TActions) => {
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
        ...initialState,
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

export { orderConfirmationModal };
