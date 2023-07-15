//  todo: enable drag&drop opportunity to sort inners and sauces inside of the constructor
//  todo: lock buns from drag&drop inside
//  todo: make a counter for used ingredients

import { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { Ingredient } from "../../shared/types/Ingredient";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { ingredients, totalPrice, error } = useSelector(
    (store: Store) => store.orderConstructor
  );
  const topBun = ingredients[0];
  const bottomBun = ingredients[ingredients.length - 1];

  const [isModalShown, setIsModalShown] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (ingredient: Ingredient) => {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ingredient,
      });
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  useEffect(() => {
    // todo: [cleanup] remove total price from the redux and calculate it in the selector
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: ingredients.reduce((acc, currIng) => currIng.price + acc, 0),
    });
  }, [ingredients, dispatch]);

  const onDelete = (index: number) =>
    dispatch({ type: REMOVE_CONSTRUCTOR_INGREDIENT, index });

  const onDrop = useCallback(
    (dragIndex: number, destinationIndex: number) => {
      dispatch({
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        dragIndex,
        destinationIndex,
      });
    },
    [dispatch]
  );

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
        <ul className={styles.ingredients}>
          {!error ? (
            <>
              {topBun && (
                <ConstructorElement
                  extraClass="ml-2"
                  text={topBun.name}
                  price={topBun.price}
                  thumbnail={topBun.image}
                  type="top"
                  isLocked
                />
              )}
              {ingredients
                .map((ingredient, index) => {
                  if (ingredient.type !== "bun") {
                    return (
                      <ConstructorIngredient
                        ingredient={ingredient}
                        key={ingredient.name + index}
                        index={index}
                        onDelete={() => onDelete(index)}
                        onDrop={onDrop}
                      />
                    );
                  }
                })
                .filter(Boolean)}
              {bottomBun && (
                <ConstructorElement
                  extraClass="ml-2"
                  text={bottomBun.name}
                  price={bottomBun.price}
                  thumbnail={bottomBun.image}
                  type="bottom"
                  isLocked
                />
              )}
            </>
          ) : (
            "Something went wrong, try to reload or pray 🙏"
          )}
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
