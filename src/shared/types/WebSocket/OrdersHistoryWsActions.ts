import {
  wsClose,
  wsInit,
  wsError,
  wsOpen,
  wsOrder,
} from "../../../redux/actions/ordersHistory";

export type TOrdersHistoryWsActions =
  | ReturnType<typeof wsInit>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;
