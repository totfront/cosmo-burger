import { TOrdersHistoryWsActions } from "../../../shared/types/WebSocket/OrdersHistoryWsActions";
import { WsStatus } from "../../../shared/types/WebSocket/WsStatus";
import {
  ORDERS_HISTORY_WS_OPEN,
  ORDERS_HISTORY_WS_CLOSED,
  ORDERS_HISTORY_WS_ORDER,
  ORDERS_HISTORY_WS_ERROR,
  ORDERS_HISTORY_WS_INIT,
} from "../../actions/ordersHistory";
import { Order, OrdersResponse } from "../../types/dataModels";

interface OrdersHistory {
  status: WsStatus;
  error: undefined | string;
  orders: Order[];
  total: number;
  totalToday: number;
}

const initialStore: OrdersHistory = {
  status: WsStatus.CLOSED,
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

// todo: (optional) rewrite with toolkit
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
  action: TOrdersHistoryWsActions
) => {
  switch (action.type) {
    case ORDERS_HISTORY_WS_OPEN:
      return {
        ...state,
        status: action.payload,
      };
    case ORDERS_HISTORY_WS_INIT:
      return {
        ...state,
        status: action.payload,
      };
    case ORDERS_HISTORY_WS_CLOSED: {
      return {
        ...state,
        status: WsStatus.CLOSED,
      };
    }
    case ORDERS_HISTORY_WS_ORDER:
      const { orders, total, totalToday } = action.payload as OrdersResponse;
      return {
        ...state,
        orders,
        total,
        totalToday,
      };
    case ORDERS_HISTORY_WS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
