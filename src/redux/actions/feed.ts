import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../types/dataModels";

// todo: add connecting to provide loaders functionality
export const FEED_WS_CONNECT = "FEED_WS_CONNECT";
export const FEED_WS_OPEN = "FEED_WS_OPEN";
export const FEED_WS_CLOSED = "FEED_WS_CLOSED";
export const FEED_WS_ORDER = "FEED_WS_ORDER";
export const FEED_WS_ERROR = "FEED_WS_ERROR";

export const wsConnect = createAction<string, typeof FEED_WS_CONNECT>(
  FEED_WS_CONNECT
);
export const wsOpen = createAction<OrdersResponse>(FEED_WS_OPEN);
export const wsClosed = createAction(FEED_WS_CLOSED);
export const wsOrder = createAction<OrdersResponse>(FEED_WS_ORDER);
export const wsError = createAction<string, typeof FEED_WS_ERROR>(
  FEED_WS_ERROR
);

export const FeedWsActions = {
  wsConnect,
  onOrder: wsOrder,
  wsOpen,
  wsClosed,
  wsError,
};
