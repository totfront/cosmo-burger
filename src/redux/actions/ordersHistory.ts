import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../types/dataModels";

// todo: add connecting to provide loaders functionality
export const ORDERS_HISTORY_WS_CONNECT = "ORDERS_HISTORY_WS_CONNECT";
// export const ORDERS_HISTORY_WS_DISCONNECT = "ORDERS_HISTORY_WS_DISCONNECT";

export const ORDERS_HISTORY_WS_OPEN = "ORDERS_HISTORY_WS_OPEN";
export const ORDERS_HISTORY_WS_CLOSED = "ORDERS_HISTORY_WS_CLOSED";
export const ORDERS_HISTORY_WS_ORDER = "ORDERS_HISTORY_WS_ORDER";
export const ORDERS_HISTORY_WS_ERROR = "ORDERS_HISTORY_WS_ERROR";

export const wsConnect = createAction<string, typeof ORDERS_HISTORY_WS_CONNECT>(
  ORDERS_HISTORY_WS_CONNECT
);
export const wsOpen = createAction<OrdersResponse>(ORDERS_HISTORY_WS_OPEN);
// export const wsClosing = createAction(ORDERS_HISTORY_WS_DISCONNECT);
export const wsClosed = createAction(ORDERS_HISTORY_WS_CLOSED);
export const wsOrder = createAction<OrdersResponse>(ORDERS_HISTORY_WS_ORDER);
export const wsError = createAction(ORDERS_HISTORY_WS_ERROR);

export type OrdersHistoryActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsOpen>
  // | ReturnType<typeof wsClosing>
  | ReturnType<typeof wsClosed>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;

export const OrdersHistoryWSActions = {
  wsConnect,
  onOrder: wsOrder,
};
