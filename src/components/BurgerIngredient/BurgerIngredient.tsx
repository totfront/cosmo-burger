import styles from "./burgerIngredient.module.css";
import subtract from "../../images/Subtract.svg";
import { FC } from "react";

interface Props {
  name: string;
  price: number;
  image: string;
}

const BurgerIngredient: FC<Props> = ({ image, price, name }) => {
  return (
    <li className={styles.ingredientWrapper}>
      <button className={styles.ingredient}>
        <img className="mb-2" src={image} alt="bun" />
        <div className={`${styles.price} mb-2`}>
          <span className={`${styles.priceNumber} mr-2 text_type_main-small`}>
            {price}
          </span>
          <img src={subtract} alt="subtract" />
        </div>
        <span>{name}</span>
      </button>
    </li>
  );
};

export default BurgerIngredient;
