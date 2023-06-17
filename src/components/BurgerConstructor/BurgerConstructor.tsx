import { FC, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import blueBun from "../../images/bun-02.svg";
import styles from "./burgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import { SET_TOTAL_PRICE } from "../../services/actions/constructor";

const BurgerConstructor: FC = () => {
  const { ingredients, totalPrice, error } = useSelector(
    (store: Store) => store.orderConstructor
  );

  const [isModalShown, setIsModalShown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const totalPrice = () => {
      let totalPrice = 0;
      for (const bun of ingredients.buns) {
        totalPrice += bun.price;
      }
      for (const sauce of ingredients.sauces) {
        totalPrice += sauce.price;
      }
      for (const inner of ingredients.inners) {
        totalPrice += inner.price;
      }
      return totalPrice;
    };

    dispatch({ type: SET_TOTAL_PRICE, totalPrice: totalPrice() });
  }, [dispatch, ingredients.buns, ingredients.inners, ingredients.sauces]);

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
          {!error
            ? [...ingredients.sauces, ...ingredients.inners].map(
                ({ image, price, name }, index) => (
                  <li className={styles.inner} key={name + index}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      extraClass="ml-2"
                      text={name}
                      price={price}
                      thumbnail={image}
                    />
                  </li>
                )
              )
            : "Something went wrong, try to reload or pray 🙏"}
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
        <span className="mr-2 text text_type_digits-medium">{totalPrice}</span>
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
