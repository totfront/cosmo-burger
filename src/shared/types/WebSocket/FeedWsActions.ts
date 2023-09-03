import {
  wsClose,
  wsInit,
  wsError,
  wsOpen,
  wsOrder,
} from "../../../redux/actions/feed";

export type TFeedWsActions =
  | ReturnType<typeof wsInit>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsOrder>
  | ReturnType<typeof wsError>;
