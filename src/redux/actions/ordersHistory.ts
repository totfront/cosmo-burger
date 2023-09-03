import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../types/dataModels";

export const ORDERS_HISTORY_WS_INIT = "ORDERS_HISTORY_WS_INIT";
export const ORDERS_HISTORY_WS_OPEN = "ORDERS_HISTORY_WS_OPEN";
export const ORDERS_HISTORY_WS_CLOSED = "ORDERS_HISTORY_WS_CLOSED";
export const ORDERS_HISTORY_WS_ORDER = "ORDERS_HISTORY_WS_ORDER";
export const ORDERS_HISTORY_WS_ERROR = "ORDERS_HISTORY_WS_ERROR";

export const wsInit = createAction<string, typeof ORDERS_HISTORY_WS_INIT>(
  ORDERS_HISTORY_WS_INIT
);
export const wsOpen = createAction<OrdersResponse>(ORDERS_HISTORY_WS_OPEN);
export const wsClosed = createAction(ORDERS_HISTORY_WS_CLOSED);
export const wsOrder = createAction<OrdersResponse>(ORDERS_HISTORY_WS_ORDER);
export const wsError = createAction<string>(ORDERS_HISTORY_WS_ERROR);

export const OrdersHistoryWSActions = {
  wsInit,
  onOrder: wsOrder,
  wsOpen,
  wsClosed,
  wsError,
};
