import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { FeedWsActions } from "./actions/feed";
import { noMorePartiesOrdersUrl } from "../shared/paths";
import { OrdersHistoryWSActions } from "./actions/ordersHistory";
import { getCookie } from "../services/helpers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const token = getCookie("accessToken")?.replace("Bearer ", "");
    return getDefaultMiddleware().concat(
      socketMiddleware(`${noMorePartiesOrdersUrl}/all`, FeedWsActions),
      socketMiddleware(
        `${noMorePartiesOrdersUrl}?token=${token}`,
        OrdersHistoryWSActions
      )
    );
  },
});
