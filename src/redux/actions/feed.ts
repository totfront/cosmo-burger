import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../types/dataModels";

// todo: add connecting to provide loaders functionality
export const FEED_WS_CONNECT = "FEED_WS_CONNECT";
// export const FEED_WS_DISCONNECT = "FEED_WS_DISCONNECT";

export const FEED_WS_OPEN = "FEED_WS_OPEN";
export const FEED_WS_CLOSED = "FEED_WS_CLOSED";
export const FEED_WS_ORDER = "FEED_WS_ORDER";
export const FEED_WS_ERROR = "FEED_WS_ERROR";

export const wsConnect = createAction<string, typeof FEED_WS_CONNECT>(
  FEED_WS_CONNECT
);
export const wsOpen = createAction<OrdersResponse>(FEED_WS_OPEN);
// export const wsClosing = createAction(FEED_WS_DISCONNECT);
export const wsClosed = createAction(FEED_WS_CLOSED);
export const wsOrder = createAction<OrdersResponse>(FEED_WS_ORDER);
export const wsError = createAction(FEED_WS_ERROR);

export type FeedActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsOpen>
  // | ReturnType<typeof wsClosing>
  | ReturnType<typeof wsClosed>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;

export const FeedWsActions = {
  wsConnect,
  onOrder: wsOrder,
};
