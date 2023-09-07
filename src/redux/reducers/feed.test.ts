import { WsStatus } from "../../shared/types/WebSocket/WsStatus";
import {
  FEED_WS_OPEN,
  FEED_WS_CLOSED,
  FEED_WS_ORDER,
  FEED_WS_ERROR,
  FEED_WS_INIT,
} from "../actions/feed";
import { Order } from "../types/dataModels";
import { feedReducer, initialState } from "./feed";

describe("feed reducer", () => {
  it("handles initial state", () => {
    expect(feedReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("handles web socket open action", () => {
    const expectedState = {
      ...initialState,
      status: WsStatus.OPEN,
    };
    expect(
      feedReducer(initialState, { type: FEED_WS_OPEN, payload: undefined })
    ).toEqual(expectedState);
  });

  it("handles web socket close action", () => {
    const expectedState = {
      ...initialState,
      status: WsStatus.CLOSED,
    };
    expect(
      feedReducer(initialState, { type: FEED_WS_CLOSED, payload: undefined })
    ).toEqual(expectedState);
  });

  it("handles FEED_WS_ORDER action", () => {
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
      type: FEED_WS_ORDER,
      payload: { orders, total, totalToday, success: true },
    };
    const expectedState = {
      ...initialState,
      orders,
      total,
      totalToday,
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  it("handles web socket error action", () => {
    const error = "An error occurred.";
    const expectedState = {
      ...initialState,
      error,
    };
    expect(
      feedReducer(initialState, {
        type: FEED_WS_ERROR,
        payload: error,
      })
    ).toEqual(expectedState);
  });

  it("handles web socket init (connection) action", () => {
    const status = WsStatus.CONNECTING;
    const expectedState = {
      ...initialState,
      status,
    };
    expect(
      feedReducer(initialState, {
        type: FEED_WS_INIT,
        payload: status,
      })
    ).toEqual(expectedState);
  });
});
