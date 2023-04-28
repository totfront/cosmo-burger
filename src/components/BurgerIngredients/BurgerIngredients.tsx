import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./burgerIngredients.module.css";
import dataBase from "../../utils/data.json";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

const BurgerIngredients = () => {
  const tabs = ["Булки", "Соусы", "Начинки"];
  const [current, setCurrent] = useState(tabs[0]);

  const searchMenuItems = (searchString: string, database = dataBase) => {
    const result = [];
    for (let i = 0; i < database.length; i++) {
      if (database[i].name.includes(searchString)) {
        result.push(database[i]);
      }
    }
    if (result.length === 0) {
      for (let i = 0; i < database.length; i++) {
        if (
          !database[i].name.includes("булка") &&
          !database[i].name.includes("Соус")
        ) {
          result.push(database[i]);
        }
      }
    }
    return result;
  };

  return (
    <section className={`${styles.wrapper} pt`}>
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
      <h3 className="text_type_main-medium mt-10 mb-6">Булки</h3>
      <ul className={styles.ingredients}>
        {searchMenuItems("булка").map((bun) => {
          const { image, price, name } = bun;
          return <BurgerIngredient name={name} image={image} price={price} />;
        })}
      </ul>
      <h3 className="text_type_main-medium mt-10 mb-6">Соусы</h3>
      <ul className={styles.ingredients}>
        {searchMenuItems("Соус").map((bun) => {
          const { image, price, name } = bun;
          return <BurgerIngredient name={name} image={image} price={price} />;
        })}
      </ul>
      <h3 className="text_type_main-medium mt-10 mb-6">Начинки</h3>
      <ul className={styles.ingredients}>
        {searchMenuItems("Начинки").map((bun) => {
          const { image, price, name } = bun;
          return <BurgerIngredient name={name} image={image} price={price} />;
        })}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
