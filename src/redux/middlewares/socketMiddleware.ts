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
import {
  noMorePartiesApiUrl,
  wsNoMorePartiesOrdersUrl,
} from "../../shared/paths";
import { getCookie } from "../../services/helpers";
import { accessToken } from "../../shared/names";

type RootState = ReturnType<typeof rootReducer>;

interface WsStoreActions {
  wsInit: ActionCreatorWithPayload<string>;
  onOrder: ActionCreatorWithPayload<OrdersResponse>;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
}

export type AppActions = TFeedWsActions | TOrdersHistoryWsActions | TActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

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
