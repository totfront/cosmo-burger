import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDER,
  WS_SEND_ORDER,
  WS_CONNECTION_START,
} from "../actions/wsActions";
import type { OrdersResponse } from "./dataModels";

// todo: consider removing since they are not applieable here
// export interface IJoinChatAction {
//   readonly type: typeof JOIN_CHAT;
// }

// export interface IJoinChatFailedAction {
//   readonly type: typeof JOIN_CHAT_FAILED;
// }

// export interface IJoinChatSuccessAction {
//   readonly type: typeof JOIN_CHAT_SUCCESS;
//   readonly user: IUserResponse;
// }

// export type TUserActions =
//   | IJoinChatAction
//   | IJoinChatFailedAction
//   | IJoinChatSuccessAction;

export interface WsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface WsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface WsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface WsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface WsGetMessageAction {
  readonly type: typeof WS_GET_ORDER;
  readonly payload: OrdersResponse;
}

export interface WsSendMessageAction {
  readonly type: typeof WS_SEND_ORDER;
  readonly payload: { message: string };
}

export type WSActions =
  | WsConnectionStart
  | WsConnectionSuccessAction
  | WsConnectionErrorAction
  | WsConnectionClosedAction
  | WsGetMessageAction
  | WsSendMessageAction;
