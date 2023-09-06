import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/Actions";
import { RootState } from "../../types/State";

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
