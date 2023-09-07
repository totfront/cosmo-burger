import { TActions } from "../../../shared/types/Actions";
import { SET_ORDER_DETAILS_MODAL } from "../../actions/orderDetailsModal";

export interface TOrderDetailsModal {
  ingredients: string[] | [];
  _id: string;
  status: string;
  name: string;
  number: number | undefined;
  createdAt: string;
  updatedAt: string;
  isPending: boolean;
}

const initialState = {
  ingredients: [],
  _id: "",
  status: "",
  name: "",
  number: undefined,
  createdAt: "",
  updatedAt: "",
  isPending: false,
};

const orderDetailsModalReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SET_ORDER_DETAILS_MODAL: {
      let status = action.payload.status;
      if (status === "done") status = "Готов";
      if (status === "pending") status = "Готовится";
      if (status === "cancelled") status = "Отменен";
      return {
        ...state,
        ...action.payload,
        status,
      };
    }
    default: {
      return state;
    }
  }
};

export { orderDetailsModalReducer };
