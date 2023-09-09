import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import Tabs from "../Tabs/Tabs";
import { useSelector } from "../../shared/hooks";

const BurgerIngredients: FC = () => {
  const { tabs, ingredients } = useSelector((store) => store.ingredients);

  const [currentTab, setCurrentTab] = useState("bun");
  const { ref: innersTabRef, inView: areInnersVisible } = useInView();
  const { ref: bunsTabRef, inView: areBunsVisible } = useInView();
  const { ref: saucesTabRef, inView: areSaucesVisible } = useInView();

  const tabRefs: any = {
    buns: bunsTabRef,
    inners: innersTabRef,
    sauces: saucesTabRef,
  };

  useEffect(() => {
    if (areBunsVisible) {
      setCurrentTab("bun");
    } else if (areSaucesVisible) {
      setCurrentTab("sauce");
    } else if (areInnersVisible) {
      setCurrentTab("main");
    }
  }, [areBunsVisible, areInnersVisible, areSaucesVisible]);

  const getIngredientGroup = (groupName: string) => {
    const { buns, sauces, inners } = ingredients;
    let result;
    switch (groupName) {
      case "buns":
        result = buns;
        break;
      case "sauces":
        result = sauces;
        break;
      case "inners":
        result = inners;
        break;
    }
    return result;
  };

  return (
    <section className={`${styles.wrapper}`}>
      <Tabs currentTab={currentTab} />
      {ingredients ? (
        <ul id={"ingredients"} className={styles.ingredients}>
          {Object.entries(tabs).map(([tabKey, tabName], index) => (
            <li
              className={styles.ingredientsGroupWrapper}
              key={index}
              ref={tabRefs[tabKey]}
              data-testid={`${tabKey}-list`}
            >
              <h3
                id={tabName}
                className={`${styles.ingredientsHeading} text text_type_main-medium mt-4 mb-6`}
              >
                {tabName}
              </h3>
              {getIngredientGroup(tabKey)?.map((ingredient) => (
                <BurgerIngredient
                  ingredient={ingredient}
                  key={ingredient._id + ingredient.name}
                />
              ))}
            </li>
          ))}
        </ul>
      ) : (
        "wait ⏳"
      )}
    </section>
  );
};

export default BurgerIngredients;
