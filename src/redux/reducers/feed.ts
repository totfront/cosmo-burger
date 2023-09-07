import { TFeedWsActions } from "../../shared/types/WebSocket/FeedWsActions";
import { WsStatus } from "../../shared/types/WebSocket/WsStatus";
import {
  FEED_WS_OPEN,
  FEED_WS_CLOSED,
  FEED_WS_ORDER,
  FEED_WS_ERROR,
  FEED_WS_INIT,
} from "../actions/feed";
import { Order } from "../types/dataModels";

interface FeedState {
  status: WsStatus;
  error: undefined | string;
  orders: Order[];
  total: number;
  totalToday: number;
}

export const initialState: FeedState = {
  status: WsStatus.CLOSED,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

// todo: (optional) rewrite with toolkit. Example:
// export const FeedReducer = createReducer(initialState, (builder) => {
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

export const feedReducer = (state = initialState, action: TFeedWsActions) => {
  switch (action.type) {
    case FEED_WS_OPEN:
      return {
        ...state,
        status: WsStatus.OPEN,
      };
    case FEED_WS_INIT:
      return {
        ...state,
        status: action.payload,
      };
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
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
