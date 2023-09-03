import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../types/dataModels";

export const FEED_WS_INIT = "FEED_WS_INIT";
export const FEED_WS_OPEN = "FEED_WS_OPEN";
export const FEED_WS_CLOSED = "FEED_WS_CLOSED";
export const FEED_WS_ORDER = "FEED_WS_ORDER";
export const FEED_WS_ERROR = "FEED_WS_ERROR";

export const wsInit = createAction<string, typeof FEED_WS_INIT>(FEED_WS_INIT);
export const wsOpen = createAction(FEED_WS_OPEN);
export const wsClose = createAction(FEED_WS_CLOSED);
export const wsOrder = createAction<OrdersResponse>(FEED_WS_ORDER);
export const wsError = createAction<string, typeof FEED_WS_ERROR>(
  FEED_WS_ERROR
);

export const FeedWsActions = {
  wsInit,
  onOrder: wsOrder,
  wsOpen,
  wsClose,
  wsError,
};
