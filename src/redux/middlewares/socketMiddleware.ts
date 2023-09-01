import type { Middleware, MiddlewareAPI } from "redux";
// import { getCurrentTimestamp } from "../../services/datetime";
import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { getCookie } from "../../services/helpers";
import { OrdersResponse } from "../types/dataModels";
import {
  //   FEED_WS_CONNECT,
  //   FEED_WS_DISCONNECT,
  //   FEED_WS_ERROR,
  //   FEED_WS_OPEN,
  //   FEED_WS_ORDER,
  FeedActions,
} from "../actions/feed";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

// todo:? pending

export type WsStoreActions = {
  //   wsInit: typeof FEED_WS_CONNECT;
  wsConnect: ActionCreatorWithPayload<string>;
  onOrder: ActionCreatorWithPayload<OrdersResponse>;
  //   sendOrder: typeof FEED_WS_ORDER;
  //   onOpen: typeof FEED_WS_OPEN;
  //   onError: typeof FEED_WS_ERROR;
  //   wsDisconnect: typeof FEED_WS_DISCONNECT;
};

export type AppActions = FeedActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const socketMiddleware =
  (wsUrl: string, wsActions: WsStoreActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      //   const { type } = action;
      const {
        wsConnect,
        onOrder,
        // onOpen, onError
      } = wsActions;
      const accessToken = getCookie("accessToken");
      // todo: reconsider token adding out of the middleware
      if (wsConnect.match(action) && accessToken) {
        // socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        // socket.onopen = (event) => {
        //   dispatch({ type: onOpen, payload: event });
        // };

        // socket.onerror = (event) => {
        //   dispatch({ type: onError, payload: event });
        // };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: OrdersResponse = JSON.parse(data);

          dispatch(onOrder(parsedData));
        };

        // socket.onclose = (event) => {
        //   dispatch({ type: onClose, payload: event });
        // };

        // if (type === sendOrder) {
        //   const { payload } = action;
        //   socket.send(JSON.stringify({ ...payload, token: accessToken }));
        // }
      }

      next(action);
    };
  };
