import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import styles from "./burgerIngredients.module.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import { searchMenuItems } from "../../utils/helpers";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

type Props = {
  ingredients: Record<string, string> | never[];
};

const BurgerIngredients: FC<Props> = ({ ingredients }) => {
  const tabs = ["Булки", "Соусы", "Начинки"];
  const [current, setCurrent] = useState(tabs[0]);
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <section className={`${styles.wrapper}`}>
      <div style={{ display: "flex" }}>
        {tabs.map((tabText, index) => (
          <Tab
            value={tabText}
            active={current === tabText}
            onClick={setCurrent}
            key={tabText + index}
          >
            {tabText}
          </Tab>
        ))}
      </div>
      <ul id={"ingredients"} className={styles.ingredients}>
        {tabs.map((tabName, index) => (
          <li className={styles.ingredientsWrapper} key={tabName + index}>
            <h3
              id={tabName}
              className={`${styles.ingredientsHeading} text text_type_main-medium mt-10 mb-6`}
            >
              {tabName}
            </h3>
            {searchMenuItems(tabName, ingredients as any).map((bun, index) => {
              const { image, price, name } = bun;
              return (
                <BurgerIngredient
                  onClick={() => setIsModalShown(true)}
                  name={name}
                  image={image}
                  price={price}
                  key={name + index}
                />
              );
            })}
          </li>
        ))}
      </ul>
      {isModalShown && (
        <IngredientDetails onClose={() => setIsModalShown(false)} />
      )}
    </section>
  );
};

export default BurgerIngredients;
