import {
  wsClosed,
  wsConnect,
  wsError,
  wsOpen,
  wsOrder,
} from "../../../redux/actions/feed";

export type TOrdersHistoryWsActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClosed>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;
