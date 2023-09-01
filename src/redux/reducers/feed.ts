// import { createReducer } from "@reduxjs/toolkit";
import { WsStatus } from "../../shared/types/WsStatus";
import {
  FeedActions,
  FEED_WS_OPEN,
  FEED_WS_CLOSED,
  FEED_WS_ORDER,
  FEED_WS_ERROR,
} from "../actions/feed";
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

export const feedReducer = (state = initialStore, action: FeedActions) => {
  switch (action.type) {
    case FEED_WS_OPEN:
      return {
        ...state,
        status: WsStatus.OPEN,
      };
    // case FEED_WS_CONNECTING:
    //   return {
    //     ...state,
    //     status: WsStatus.CONNECTING,
    //   };
    // case FEED_WS_CLOSING:
    //   return {
    //     ...state,
    //     status: WsStatus.CLOSING,
    //   };
    case FEED_WS_CLOSED: {
      return {
        ...state,
        status: WsStatus.CLOSED,
      };
    }
    case FEED_WS_ORDER:
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        orders,
        total,
        totalToday,
      };
    case FEED_WS_ERROR:
      return {};
    default:
      return state;
  }
};
