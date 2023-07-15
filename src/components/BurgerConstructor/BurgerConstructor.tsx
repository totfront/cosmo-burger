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
import { submitOrder } from "../../services/actions/order";
import {
  DECREASE_INGREDIENTS_COUNTER,
  INCREASE_INGREDIENTS_COUNTER,
} from "../../services/actions/ingredients";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { ingredients, totalPrice, error } = useSelector(
    (store: Store) => store.orderConstructor
  );

  const buns = ingredients.filter((i) => i.type === "bun");
  const topBun = buns[0];
  const bottomBun = buns[1];

  const [isModalShown, setIsModalShown] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (ingredient: Ingredient) => {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ingredient,
      });
      dispatch({
        type: INCREASE_INGREDIENTS_COUNTER,
        id: ingredient._id,
      });
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  useEffect(() => {
    dispatch({
      type: SET_TOTAL_PRICE,
      totalPrice: ingredients.reduce((acc, currIng) => currIng.price + acc, 0),
    });
  }, [ingredients, dispatch]);

  const onDelete = (index: number, id: string) => {
    dispatch({ type: DECREASE_INGREDIENTS_COUNTER, id });
    dispatch({ type: REMOVE_CONSTRUCTOR_INGREDIENT, index });
  };

  const onDrop = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch({
        type: MOVE_CONSTRUCTOR_INGREDIENT,
        dragIndex,
        hoverIndex,
      });
    },
    [dispatch]
  );

  const onClick = (e: any) => {
    e.preventDefault();
    setIsModalShown(true);
    const ingredientsIds = ingredients.map((i) => i._id);
    dispatch(submitOrder(ingredientsIds) as any);
  };

  // TODO: make buns as a LI elements. Improve the ConstructorIngredient component to get needed props abd become more universal
  return (
    <section className={styles.constructorWrapper} ref={drop}>
      <div className={`${styles.constructor}`}>
        {!error ? (
          <ul className={styles.ingredients}>
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
            <ul className={`${styles.ingredients} ${styles.innersAndSauces}`}>
              {ingredients
                .map(
                  (ingredient, index) =>
                    ingredient.type !== "bun" && (
                      <ConstructorIngredient
                        ingredient={ingredient}
                        key={ingredient.name + index}
                        index={index}
                        onDelete={() => onDelete(index, ingredient._id)}
                        onDrop={(dragIndex, hoverIndex) => {
                          onDrop(dragIndex, hoverIndex);
                        }}
                      />
                    )
                )
                .filter(Boolean)}
            </ul>
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
          </ul>
        ) : (
          "Something went wrong, reload or pray 🙏"
        )}
      </div>
      <span className={styles.price}>
        <span className="mr-2 text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </span>
      <Button onClick={onClick} htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
      {isModalShown && <OrderDetails onClose={() => setIsModalShown(false)} />}
    </section>
  );
};

export default BurgerConstructor;
