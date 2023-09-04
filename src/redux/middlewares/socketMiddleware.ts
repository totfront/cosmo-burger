import type { Middleware } from "redux";
import { OrdersResponse } from "../types/dataModels";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { AppActions } from "../../shared/types/Actions";
import { RootState } from "../../shared/types/State";

interface WsStoreActions {
  wsInit: ActionCreatorWithPayload<string>;
  onOrder: ActionCreatorWithPayload<OrdersResponse>;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
}

export const socketMiddleware =
  (wsActions: WsStoreActions): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;

      const { wsInit, onOrder, wsClose, wsOpen, wsError } = wsActions;

      if (wsInit.match(action)) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: OrdersResponse = JSON.parse(data);
          dispatch(onOrder(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsClose());
        };
      }

      next(action);
    };
  };
