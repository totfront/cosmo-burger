// todos:
// 1. sort buns to be on the top and the bottom
// 2. enable drag&drop opportunity to sort inner and sauces inside of the constructor
// 3. lock buns from drag&drop inside
// 4. make a counter for used ingredients
// 5. buns should be the same / buns could be replaced / buns can not be mixed

import { FC, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { Ingredient } from "../../shared/types/Ingredient";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { ingredients, totalPrice, error } = useSelector(
    (store: Store) => store.orderConstructor
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (ingredient: Ingredient) => {
      console.log(" dragged ingredient", ingredient);
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ingredient,
      });
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  useEffect(() => {
    // remove total price from the redux and calculate it in the selector
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: ingredients.reduce((acc, currIng) => currIng.price + acc, 0),
    });
  }, [ingredients]);

  console.log({ ingredients });

  return (
    <section className={styles.constructorWrapper} ref={drop}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
        }}
        className={`${styles.constructor}`}
      >
        <ul className={styles.inners}>
          {!error
            ? ingredients.map(({ image, price, name }, index) => (
                <li className={styles.inner} key={name + index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    extraClass="ml-2"
                    text={name}
                    price={price}
                    thumbnail={image}
                  />
                </li>
              ))
            : "Something went wrong, try to reload or pray 🙏"}
        </ul>
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
