import {
  wsClosed,
  wsInit,
  wsError,
  wsOpen,
  wsOrder,
} from "../../../redux/actions/ordersHistory";

export type TOrdersHistoryWsActions =
  | ReturnType<typeof wsInit>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClosed>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;
