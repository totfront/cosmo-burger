// import { createReducer } from "@reduxjs/toolkit";
import { WsStatus } from "../../shared/types/WsStatus";
import {
  OrdersHistoryActions,
  ORDERS_HISTORY_WS_OPEN,
  ORDERS_HISTORY_WS_CLOSED,
  ORDERS_HISTORY_WS_ORDER,
  ORDERS_HISTORY_WS_ERROR,
} from "../actions/ordersHistory";
import { Order } from "../types/dataModels";

interface FeedStore {
  status: WsStatus;
  error: undefined | string;
  orders: Order[];
  total: number;
  totalToday: number;
}

const initialStore: FeedStore = {
  status: WsStatus.CLOSED,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

// export const FeedReducer = createReducer(initialStore, (builder) => {
//   builder
//     .addCase(wsConnecting, (state) => {
//       state.status = WsStatus.CONNECTING;
//     })
//     .addCase(wsOpen, (state) => {
//       state.status = WsStatus.ONLINE;
//       state.error = "";
//     })
//     .addCase(wsClose, (state) => {
//       state.status = WsStatus.OFFLINE;
//     })
//     .addCase(wsError, (state, action) => {
//       state.error = action.payload;
//     })
//     .addCase(wsOrder, (state, action) => {
//       state.feed = updateFeed(state.feed, action.payload);
//     });
// });

export const ordersHistoryReducer = (
  state = initialStore,
  action: OrdersHistoryActions
) => {
  switch (action.type) {
    case ORDERS_HISTORY_WS_OPEN:
      return {
        ...state,
        status: WsStatus.OPEN,
      };
    // case ORDERS_HISTORY_WS_CONNECTING:
    //   return {
    //     ...state,
    //     status: WsStatus.CONNECTING,
    //   };
    // case ORDERS_HISTORY_WS_CLOSING:
    //   return {
    //     ...state,
    //     status: WsStatus.CLOSING,
    //   };
    case ORDERS_HISTORY_WS_CLOSED: {
      return {
        ...state,
        status: WsStatus.CLOSED,
      };
    }
    case ORDERS_HISTORY_WS_ORDER:
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        orders,
        total,
        totalToday,
      };
    case ORDERS_HISTORY_WS_ERROR:
      return {};
    default:
      return state;
  }
};
