import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { FeedWsActions } from "./actions/feed";
import { wsNoMorePartiesOrdersUrl } from "../shared/paths";
import { getCookie } from "../services/helpers";
import { accessToken } from "../shared/names";
import { OrdersHistoryWSActions } from "./actions/ordersHistory";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      socketMiddleware(FeedWsActions),
      socketMiddleware(OrdersHistoryWSActions)
    );
  },
});
