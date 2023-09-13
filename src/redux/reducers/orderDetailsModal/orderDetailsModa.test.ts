import { SET_ORDER_DETAILS_MODAL } from "../../actions/orderDetailsModal";
import { orderDetailsModalReducer, initialState } from "./orderDetailsModal";
import { TActions } from "../../../shared/types/Actions";

const payloadTemplate = {
  ingredients: ["ingredient1", "ingredient2"],
  _id: "order-id",
  name: "Order 1",
  number: 1,
  createdAt: "2023-09-07T12:00:00Z",
  updatedAt: "2023-09-07T12:30:00Z",
  isPending: false,
};

describe("orderDetailsModalReducer", () => {
  it("handles set order details modal action with status 'done'", () => {
    const payload = {
      ...payloadTemplate,
      status: "done",
    };

    const action: TActions = {
      type: SET_ORDER_DETAILS_MODAL,
      payload,
    };

    const expectedState = {
      ...payloadTemplate,
      status: "Готов",
    };

    expect(orderDetailsModalReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("handles set order details modal action with status 'pending'", () => {
    const payload = {
      ...payloadTemplate,
      status: "pending",
    };

    const action: TActions = {
      type: SET_ORDER_DETAILS_MODAL,
      payload,
    };

    const expectedState = {
      ...payloadTemplate,
      status: "Готовится",
    };

    expect(orderDetailsModalReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("handles set order details modal action with status 'cancelled'", () => {
    const payload = {
      ...payloadTemplate,
      status: "cancelled",
    };

    const action: TActions = {
      type: SET_ORDER_DETAILS_MODAL,
      payload,
    };

    const expectedState = { ...payloadTemplate, status: "Отменен" };

    expect(orderDetailsModalReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  it("handles unknown action type", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    } as unknown as TActions;

    expect(orderDetailsModalReducer(initialState, action)).toEqual(
      initialState
    );
  });
});
