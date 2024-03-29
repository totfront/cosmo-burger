import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { switchTabActionCreator } from "../../redux/actions/ingredients";
import styles from "./tabs.module.css";
import { useDispatch, useSelector } from "../../shared/hooks";

type Props = {
  currentTab: string;
};

const Tabs: FC<Props> = ({ currentTab }) => {
  const dispatch = useDispatch();
  const { tabs } = useSelector((store) => store.ingredients);

  // TODO: create a proper shape of the store for the ingredients Ingredient[] and tabs (most likely we do not need it)
  if (currentTab === "main") {
    currentTab = "inners";
  }
  if (currentTab === "bun") {
    currentTab = "buns";
  }
  if (currentTab === "sauce") {
    currentTab = "sauces";
  }

  return (
    <div className={styles.tabsWrapper}>
      {Object.entries(tabs).map(([tabKey, tabName], index) => (
        <Tab
          value={tabName}
          active={currentTab === tabKey}
          onClick={() => {
            dispatch({
              type: switchTabActionCreator(tabKey),
            } as any);
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
