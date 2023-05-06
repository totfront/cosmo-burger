import { FC, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import blueBun from "../../images/bun-02.svg";
import styles from "./burgerConstructor.module.css";
import { searchMenuItems } from "../../utils/helpers";
import OrderDetails from "../OrderDetails/OrderDetails";

type Props = {
  ingredients: Record<string, string>[];
};

const BurgerConstructor: FC<Props> = ({ ingredients }) => {
  const [burgerInners, setBurgerInners] = useState([]);
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    const souses = searchMenuItems("Соус", ingredients);
    const inners = searchMenuItems("Начинка", ingredients);
    setBurgerInners([...souses, ...inners] as any);
  }, [ingredients]);

  return (
    <section className={styles.constructorWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
        }}
        className={`${styles.constructor}`}
      >
        <ConstructorElement
          extraClass={styles.bun}
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={blueBun}
        />
        <ul className={styles.inners}>
          {burgerInners.map(({ image, price, name }, index) => (
            <li className={styles.inner} key={name + index}>
              <DragIcon type="primary" />
              <ConstructorElement
                extraClass="ml-2"
                text={name}
                price={price}
                thumbnail={image}
              />
            </li>
          ))}
        </ul>
        <ConstructorElement
          extraClass={styles.bun}
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={blueBun}
        />
      </div>
      <span className={styles.price}>
        <span className="mr-2 text text_type_digits-medium">610</span>
        <CurrencyIcon type="primary" />
      </span>
      <Button
        onClick={() => setIsModalShown(true)}
        htmlType="button"
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
      {isModalShown && <OrderDetails onClose={() => setIsModalShown(false)} />}
    </section>
  );
};

export default BurgerConstructor;
