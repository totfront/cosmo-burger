import { ActionTypes } from "../../shared/types/Actions";
import { Header } from "../../shared/types/Header";
import { SET_ACTIVE_NAV_LINK } from "../actions/header";
const initialState: Header = {
  activeLink: "",
};

export const headerReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_ACTIVE_NAV_LINK: {
      const { activeLink } = action;
      return {
        ...state,
        activeLink,
      };
    }
    default: {
      return state;
    }
  }
};
