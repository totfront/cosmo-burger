import {
  ORDERS_HISTORY_WS_OPEN,
  ORDERS_HISTORY_WS_CLOSED,
  ORDERS_HISTORY_WS_ORDER,
  ORDERS_HISTORY_WS_ERROR,
  ORDERS_HISTORY_WS_INIT,
} from "../../actions/ordersHistory";
import { ordersHistoryReducer, initialStore } from "./ordersHistory";
import { Order, OrdersResponse } from "../../types/dataModels";
import { TOrdersHistoryWsActions } from "../../../shared/types/WebSocket/OrdersHistoryWsActions";
import { WsStatus } from "../../../shared/types/WebSocket/WsStatus";

describe("ordersHistoryReducer", () => {
  it("handles initial state", () => {
    expect(
      ordersHistoryReducer(undefined, {} as unknown as TOrdersHistoryWsActions)
    ).toEqual(initialStore);
  });

  it("handles orders history open action", () => {
    const payload = WsStatus.CONNECTING;
    const action = { type: ORDERS_HISTORY_WS_OPEN, payload };
    const expectedState = {
      ...initialStore,
      status: payload,
    };
    expect(ordersHistoryReducer(initialStore, action)).toEqual(expectedState);
  });

  it("handles orders history connecting action", () => {
    const payload = WsStatus.CONNECTING;
    const action = { type: ORDERS_HISTORY_WS_INIT, payload };
    const expectedState = {
      ...initialStore,
      status: payload,
    };
    expect(ordersHistoryReducer(initialStore, action)).toEqual(expectedState);
  });

  it("handles orders history close action", () => {
    const expectedState = {
      ...initialStore,
      status: WsStatus.CLOSED,
    };
    expect(
      ordersHistoryReducer(initialStore, {
        type: ORDERS_HISTORY_WS_CLOSED,
        payload: undefined,
      })
    ).toEqual(expectedState);
  });

  it("handles orders history on message action", () => {
    const orders: Order[] = [
      {
        ingredients: ["ingredient1", "ingredient2"],
        _id: "order-id",
        status: "pending",
        name: "Order 1",
        number: 1,
        createdAt: "2023-09-07T12:00:00Z",
        updatedAt: "2023-09-07T12:30:00Z",
      },
    ];
    const total = 1;
    const totalToday = 1;
    const action = {
      type: ORDERS_HISTORY_WS_ORDER,
      payload: { orders, total, totalToday } as OrdersResponse,
    };
    const expectedState = {
      ...initialStore,
      orders,
      total,
      totalToday,
    };
    expect(ordersHistoryReducer(initialStore, action)).toEqual(expectedState);
  });

  it("handles orders history error action", () => {
    const error = "An error occurred.";
    const expectedState = {
      ...initialStore,
      error,
    };
    expect(
      ordersHistoryReducer(initialStore, {
        type: ORDERS_HISTORY_WS_ERROR,
        payload: error,
      })
    ).toEqual(expectedState);
  });
});
