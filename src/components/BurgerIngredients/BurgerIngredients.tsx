import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Dispatch, FC, useEffect } from "react";
import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { Ingredient } from "../../shared/types/Ingredient";
import {
  HIDE_INGREDIENT_MODAL,
  SET_MODAL_INGREDIENT,
  SHOW_INGREDIENT_MODAL,
} from "../../services/actions/ingredientModal";
import {
  SELECT_BUNS_TAB,
  SELECT_INNERS_TAB,
  SELECT_SAUCES_TAB,
  getIngredients,
} from "../../services/actions/ingredients";

const BurgerIngredients: FC = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const {
    ingredients: { tabs, currentTab, ingredients },
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

  const getSwitchTabAction = (tabKey: string) => {
    let result;
    switch (tabKey) {
      case "buns":
        result = SELECT_BUNS_TAB;
        break;
      case "sauces":
        result = SELECT_SAUCES_TAB;
        break;
      case "inners":
        result = SELECT_INNERS_TAB;
        break;
    }
    return result;
  };

  return (
    <section className={`${styles.wrapper}`}>
      <div style={{ display: "flex" }}>
        {Object.entries(tabs).map(([tabKey, tabName], index) => (
          <Tab
            value={tabName}
            active={currentTab === tabName}
            onClick={() => {
              dispatch({
                type: getSwitchTabAction(tabKey),
              });
            }}
            key={tabName + index}
          >
            {tabName}
          </Tab>
        ))}
      </div>
      <ul id={"ingredients"} className={styles.ingredients}>
        {Object.entries(tabs).map(([tabKey, tabName], index) => (
          <li className={styles.ingredientsWrapper} key={tabName + index}>
            <h3
              id={tabName}
              className={`${styles.ingredientsHeading} text text_type_main-medium mt-10 mb-6`}
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
