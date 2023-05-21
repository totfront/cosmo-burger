import { FC } from "react";
import Modal from "../Modal/Modal";
import styles from "./ingredientDetails.module.css";
import tempImage from "../../images/meat-01.png";
import { useSelector } from "react-redux";
import { Store } from "../../shared/types/Store";

type Props = {
  onClose: () => void;
};

const IngredientDetails: FC<Props> = ({ onClose }) => {
  const { selectedIngredient } = useSelector(
    (store: Store) => store.ingredientModal
  );

  return (
    <Modal isIngredient onClose={onClose}>
      <div className={styles.inner}>
        <img className={styles.image} src={tempImage} alt="ingredient" />
        <h3 className={`${styles.heading} mt-4 text text_type_main-medium`}>
          {selectedIngredient?.name}
        </h3>
        <ul
          className={`${styles.ingredientsList} text text_type_main-default text_color_inactive mb-5 mt-8 `}
        >
          <li className={`${styles.ingredientItem}`}>
            <span className={styles.textBlock}>Калории, ккал</span>
            <span
              className={`${styles.textBlock} mt-2 text_type_digits-default`}
            >
              {selectedIngredient?.fat}
            </span>
          </li>
          <li className={`${styles.ingredientItem}`}>
            <span className={styles.textBlock}>Белки, г</span>
            <span
              className={`${styles.textBlock} mt-2 text_type_digits-default`}
            >
              {selectedIngredient?.proteins}
            </span>
          </li>
          <li className={`${styles.ingredientItem}`}>
            <span className={styles.textBlock}>Жиры, г</span>
            <span
              className={`${styles.textBlock} mt-2 text_type_digits-default`}
            >
              {selectedIngredient?.fat}
            </span>
          </li>
          <li className={`${styles.ingredientItem}`}>
            <span className={styles.textBlock}>Углеводы, г</span>
            <span
              className={`${styles.textBlock} mt-2 text_type_digits-default`}
            >
              {selectedIngredient?.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default IngredientDetails;
