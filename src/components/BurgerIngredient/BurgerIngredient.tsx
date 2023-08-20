import styles from "./burgerIngredient.module.css";
import { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { SHOW_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";
import { Ingredient } from "../../shared/types/Ingredient";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { ingredientsPath } from "../../shared/paths";

type Props = {
  ingredient: Ingredient;
};

const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const { name, price, image, counter, _id } = ingredient;
  const location = useLocation();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  const dispatch = useDispatch();

  const handleOnclick = () => {
    dispatch({
      type: SHOW_INGREDIENT_MODAL,
      ingredient,
    });
  };

  return (
    <Link
      onClick={handleOnclick}
      className={`${styles.ingredient} mb-6`}
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={drag}
      to={`${ingredientsPath}/${_id}`}
      state={{ background: location }}
    >
      <img className="mb-2" src={image} alt={name} loading="lazy" />
      <div className={`${styles.price} mb-2`}>
        <span
          className={`${styles.priceNumber} mr-2 text text_type_digits-default`}
        >
          {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={"text text_type_main-default"}>{name}</span>
      {counter && counter !== 0 ? <Counter count={counter} /> : null}
    </Link>
  );
};

export default BurgerIngredient;
