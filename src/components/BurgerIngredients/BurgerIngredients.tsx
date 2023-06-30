import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import {
  HIDE_INGREDIENT_MODAL,
  SHOW_INGREDIENT_MODAL,
} from "../../services/actions/ingredientModal";
import { getIngredients } from "../../services/actions/ingredients";
import Tabs from "../Tabs/Tabs";

const BurgerIngredients: FC = () => {
  const dispatch: any = useDispatch();
  const { ref: innersTabRef, inView: isInnersTabVisible } = useInView();
  const { ref: bunsTabRef, inView: isBunsTabVisible } = useInView();
  const { ref: saucesTabRef, inView: isSaucesTabVisible } = useInView();

  const tabRefs: any = {
    buns: { ref: bunsTabRef, isVisible: isBunsTabVisible },
    inners: { ref: innersTabRef, isVisible: isInnersTabVisible },
    sauces: { ref: saucesTabRef, isVisible: isSaucesTabVisible },
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
      <Tabs tabRefs={tabRefs} />
      <ul id={"ingredients"} className={styles.ingredients}>
        {Object.entries(tabs).map(([tabKey, tabName], index) => (
          <li
            className={styles.ingredientsGroupWrapper}
            key={tabName + index}
            ref={tabRefs[tabKey].ref}
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
              type: isModalShown
                ? HIDE_INGREDIENT_MODAL
                : SHOW_INGREDIENT_MODAL,
            })
          }
        />
      )}
    </section>
  );
};

export default BurgerIngredients;
