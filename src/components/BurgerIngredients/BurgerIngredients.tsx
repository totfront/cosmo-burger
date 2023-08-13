import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { HIDE_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";
import Tabs from "../Tabs/Tabs";
import { getIngredients } from "../../services/actions/ingredients";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultPath } from "../../shared/paths";
import { v4 as uuid } from "uuid";

const BurgerIngredients: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isModalShown, isHomePageHidden } = useSelector(
    (store: State) => store.ingredientModal
  );
  const { tabs, ingredients } = useSelector(
    (store: State) => store.ingredients
  );
  const dispatch: any = useDispatch();

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

  const onModalClose = () => {
    const {
      from: { pathname },
    } = location.state || { from: { pathname: defaultPath } };
    dispatch({
      type: HIDE_INGREDIENT_MODAL,
    });
    navigate(pathname);
  };

  return (
    <section className={`${styles.wrapper}`}>
      {!isHomePageHidden && (
        <>
          <Tabs currentTab={currentTab} />
          <ul id={"ingredients"} className={styles.ingredients}>
            {Object.entries(tabs).map(([tabKey, tabName], index) => (
              <li
                className={styles.ingredientsGroupWrapper}
                key={uuid()}
                ref={tabRefs[tabKey]}
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
        </>
      )}
      {isModalShown && <IngredientDetails onClose={onModalClose} />}
    </section>
  );
};

export default BurgerIngredients;
