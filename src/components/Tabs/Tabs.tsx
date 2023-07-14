// todo: fix the double-selected tabs

import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ReactNode, RefObject } from "react";
import { switchTabActionCreator } from "../../services/actions/ingredients";

type Props = {
  tabRefs: {
    [key: string]: { ref: RefObject<ReactNode>; isVisible: boolean };
  };
};

const Tabs: FC<Props> = ({ tabRefs }) => {
  const dispatch: any = useDispatch();
  const {
    ingredients: { tabs },
  } = useSelector((store: Store) => store);
  return (
    <div style={{ display: "flex" }}>
      {Object.entries(tabs).map(([tabKey, tabName], index) => (
        <Tab
          value={tabName}
          active={tabRefs[tabKey].isVisible}
          onClick={() => {
            dispatch({
              type: switchTabActionCreator(tabKey),
            });
          }}
          key={tabName + index}
        >
          {tabName}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
