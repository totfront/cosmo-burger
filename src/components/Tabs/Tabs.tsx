import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { switchTabActionCreator } from "../../services/actions/ingredients";
import styles from "./tabs.module.css";

type Props = {
  currentTab: string;
};

const Tabs: FC<Props> = ({ currentTab }) => {
  const dispatch: any = useDispatch();
  const {
    ingredients: { tabs },
  } = useSelector((store: Store) => store);

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
      {Object.entries(tabs).map(([tabKey, tabName], index) => {
        console.log({ tabKey, currentTab });
        return (
          <Tab
            value={tabName}
            active={currentTab === tabKey}
            onClick={() => {
              dispatch({
                type: switchTabActionCreator(tabKey),
              });
            }}
            key={tabName + index}
          >
            {tabName}
          </Tab>
        );
      })}
    </div>
  );
};

export default Tabs;
