import type { Middleware } from "redux";
import type { ThunkDispatch } from "redux-thunk";
import { OrdersResponse } from "../types/dataModels";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { TActions } from "../../shared/types/Actions";
import { TFeedWsActions } from "../../shared/types/WebSocket/FeedWsActions";
import { TOrdersHistoryWsActions } from "../../shared/types/WebSocket/OrdersHistoryWsActions";

type RootState = ReturnType<typeof rootReducer>;

interface WsStoreActions {
  wsInit: ActionCreatorWithPayload<string>;
  onOrder: ActionCreatorWithPayload<OrdersResponse>;
  wsOpen: ActionCreatorWithPayload<OrdersResponse>;
  wsClosed: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
}

export type AppActions = TFeedWsActions | TOrdersHistoryWsActions | TActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const socketMiddleware =
  (wsUrl: string, wsActions: WsStoreActions): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { wsInit, onOrder, wsClosed, wsOpen, wsError } = wsActions;
      if (wsInit.match(action)) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsOpen, payload: event });
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
          dispatch(wsClosed());
        };
      }

      next(action);
    };
  };
