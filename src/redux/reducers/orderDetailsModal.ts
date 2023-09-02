import { ActionTypes } from "../../shared/types/Actions";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from "../actions/order";
import { SET_ORDER_DETAILS_MODAL } from "../actions/orderDetailsModal";
import { OrdersResponse } from "../types/dataModels";

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

const orderDetailsModalReducer = (
  state = initialState,
  action: ActionTypes
) => {
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
