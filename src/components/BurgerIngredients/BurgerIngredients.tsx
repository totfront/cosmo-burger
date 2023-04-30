import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import { searchMenuItems } from "../../utils/helpers";

const BurgerIngredients = () => {
  const tabs = ["Булки", "Соусы", "Начинки"];
  const [current, setCurrent] = useState(tabs[0]);

  const tabNameConverter = (name: string) => {
    if (name === "Булки") return "buns";
    if (name === "Соусы") return "souses";
    return "inners";
  };

  const handleTabChange = () => {
    // todo: complete tab switcher
    // ingredientWrapper;
  };

  return (
    <section className={`${styles.wrapper}`}>
      <div style={{ display: "flex" }}>
        {tabs.map((tabText) => (
          <Tab
            value={tabText}
            active={current === tabText}
            onClick={setCurrent}
          >
            {tabText}
          </Tab>
        ))}
      </div>
      <ul id={"#ingredients"} className={styles.ingredients}>
        {tabs.map((tabName) => (
          <li className={styles.ingredientWrapper}>
            <h3
              id={`#${tabNameConverter(tabName)}`}
              className={`${styles.ingredientsHeading} text text_type_main-medium mt-10 mb-6`}
            >
              {tabName}
            </h3>
            {searchMenuItems(tabName).map((bun) => {
              const { image, price, name } = bun;
              return (
                <BurgerIngredient name={name} image={image} price={price} />
              );
            })}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
