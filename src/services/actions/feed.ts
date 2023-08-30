import { createAction } from "@reduxjs/toolkit";

export const FEED_CONNECT = "FEED_CONNECT";

export const connect = createAction<string, typeof FEED_CONNECT>(FEED_CONNECT);
export const disconnect = createAction(FEED_CONNECT);
export const wsConnecting = createAction("FEED_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsOrder = createAction("FEED_WS_ORDER");

export type FeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsOrder>;
