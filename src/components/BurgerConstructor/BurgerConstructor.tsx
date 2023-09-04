import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import Confirmation from "../Confirmation/Confirmation";
import {
  ADD_CONSTRUCTOR_INGREDIENT,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  SET_TOTAL_PRICE,
} from "../../redux/actions/constructor";
import { useDrop } from "react-dnd";
import { Ingredient } from "../../shared/types/Ingredient";
import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import {
  DECREASE_INGREDIENTS_COUNTER,
  INCREASE_INGREDIENTS_COUNTER,
} from "../../redux/actions/ingredients";
import { submitOrder } from "../../services/apis/burgerApi";
import { useNavigate } from "react-router-dom";
import { loginPath } from "../../shared/paths";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "../../shared/hooks";

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state.user);
  const { ingredients, totalPrice, error } = useSelector(
    (state) => state.orderConstructor
  );

  const buns = ingredients.filter((i) => i.type === "bun");
  const topBun = buns[0];
  const bottomBun = buns[1];

  const [isModalShown, setIsModalShown] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      return navigate(loginPath);
    }
    setIsModalShown(true);
    const ingredientsIds = ingredients.map((i) => i._id);
    dispatch(submitOrder(ingredientsIds));
  };

  // TODO: make buns as a LI elements. Improve the ConstructorIngredient component to get needed props and become more universal
  return (
    <section className={styles.constructorWrapper} ref={drop}>
      <div className={`${styles.constructor}`}>
        {!error ? (
          <ul className={styles.ingredients}>
            {topBun && (
              <ConstructorElement
                extraClass="ml-2"
                text={`${topBun.name} (верх)`}
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
                        key={ingredient.uuid}
                        index={index}
                        onDelete={() => onDelete(index, ingredient._id)}
                        onDrop={onDrop}
                      />
                    )
                )
                .filter(Boolean)}
            </ul>
            {bottomBun && (
              <ConstructorElement
                extraClass="ml-2"
                text={`${bottomBun.name} (низ)`}
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
      {ingredients.length ? (
        <>
          <span className={styles.price}>
            <span className="mr-2 text text_type_digits-medium">
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </span>
          <Button
            onClick={onClick}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </>
      ) : (
        <p className={`${styles.explanation} text text_type_main-default`}>
          Перетащите сюда ингридиенты 👇
        </p>
      )}
      {isModalShown && (
        <Modal onClose={() => setIsModalShown(false)}>
          <Confirmation />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
