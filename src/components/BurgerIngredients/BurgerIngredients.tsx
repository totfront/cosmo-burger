import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { HIDE_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";
import Tabs from "../Tabs/Tabs";
import { getIngredients } from "../../services/actions/ingredients";

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const dispatch: any = useDispatch();
  const { ref: innersTabRef, inView: areInnersVisible } = useInView();
  const { ref: bunsTabRef, inView: areBunsVisible } = useInView();
  const { ref: saucesTabRef, inView: areSaucesVisible } = useInView();

  const tabRefs: any = {
    buns: bunsTabRef,
    inners: innersTabRef,
    sauces: saucesTabRef,
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (areBunsVisible) {
      setCurrentTab("bun");
    } else if (areSaucesVisible) {
      setCurrentTab("sauce");
    } else if (areInnersVisible) {
      setCurrentTab("main");
    }
  }, [areBunsVisible, areInnersVisible, areSaucesVisible]);

  const {
    ingredients: { tabs, ingredients },
    ingredientModal: { isModalShown },
  } = useSelector((store: Store) => store);

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
      <ul id={"ingredients"} className={styles.ingredients}>
        {Object.entries(tabs).map(([tabKey, tabName], index) => (
          <li
            className={styles.ingredientsGroupWrapper}
            key={tabName + index}
            ref={tabRefs[tabKey]}
          >
            <h3
              id={tabName}
              className={`${styles.ingredientsHeading} text text_type_main-medium mt-4 mb-6`}
            >
              {tabName}
            </h3>
            {getIngredientGroup(tabKey)?.map((ingredient, index) => {
              const { name } = ingredient;
              return (
                <BurgerIngredient ingredient={ingredient} key={name + index} />
              );
            })}
          </li>
        ))}
      </ul>
      {isModalShown && (
        <IngredientDetails
          onClose={() =>
            dispatch({
              type: HIDE_INGREDIENT_MODAL,
            })
          }
        />
      )}
    </section>
  );
};

export default BurgerIngredients;
