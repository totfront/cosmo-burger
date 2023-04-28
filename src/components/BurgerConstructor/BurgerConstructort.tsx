import { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredients from "../../utils/data.json";
import blueBun from "../../images/bun-02.svg";
import styles from "./burgerConstructor.module.css";

const BurgerConstructor = () => {
  const [burgerInners, setBurgerInners] = useState([
    ingredients[5],
    ingredients[4],
    ingredients[7],
    ingredients[8],
    ingredients[8],
  ]);

  return (
    <section className={styles.constructorWrapper}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={blueBun}
        />
        <ul className={styles.inners}>
          {burgerInners.map(({ image, price, name }) => (
            <li className={styles.inner}>
              <DragIcon type="primary" />
              <ConstructorElement text={name} price={price} thumbnail={image} />
            </li>
          ))}
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={blueBun}
        />
      </div>
      <span className={styles.price}>
        610
        <img />
      </span>
      <button className={styles.btnSubmit}>Оформить заказ</button>
    </section>
  );
};

export default BurgerConstructor;
