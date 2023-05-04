import styles from "./burgerIngredient.module.css";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
  name: string;
  price: number;
  image: string;
}

const BurgerIngredient: FC<Props> = ({ image, price, name }) => {
  return (
    <button className={styles.ingredient}>
      <img className="mb-2" src={image} alt={name} />
      <div className={`${styles.price} mb-2`}>
        <span
          className={`${styles.priceNumber} mr-2 text text_type_digits-default`}
        >
          {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={"text text_type_main-default"}>{name}</span>
    </button>
  );
};

export default BurgerIngredient;
