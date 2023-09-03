import { TActions } from "../../shared/types/Actions";
import { SET_ORDER_DETAILS_MODAL } from "../actions/orderDetailsModal";

export type OrderState = typeof initialState;

const initialState = {
  ingredients: [],
  _id: "",
  status: "",
  name: "",
  number: 0,
  createdAt: "",
  updatedAt: "",
};

const orderDetailsModalReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SET_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { orderDetailsModalReducer };
