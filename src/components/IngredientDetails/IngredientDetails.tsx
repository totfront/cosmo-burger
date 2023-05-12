import { FC } from "react";
import Modal from "../Modal/Modal";
import styles from "./ingredientDetails.module.css";
import tempImage from "../../images/meat-01.png";

type Props = {
  onClose: () => void;
};

const IngredientDetails: FC<Props> = ({ onClose }) => (
  <Modal isIngredient onClose={onClose}>
    <div className={styles.inner}>
      <img className={styles.image} src={tempImage} alt="ингредиент" />
      <h3 className={`${styles.heading} mt-4 text text_type_main-medium`}>
        Биокотлета и марсианской Магнолии
      </h3>
      <ul
        className={`${styles.ingredientsList} text text_type_main-default text_color_inactive mb-5 mt-8 `}
      >
        <li className={`${styles.ingredientItem}`}>
          <span className={styles.textBlock}>Калории, ккал</span>
          <span className={`${styles.textBlock} mt-2 text_type_digits-default`}>
            244,4
          </span>
        </li>
        <li className={`${styles.ingredientItem}`}>
          <span className={styles.textBlock}>Белки, г</span>
          <span className={`${styles.textBlock} mt-2 text_type_digits-default`}>
            12,2
          </span>
        </li>
        <li className={`${styles.ingredientItem}`}>
          <span className={styles.textBlock}>Жиры, г</span>
          <span className={`${styles.textBlock} mt-2 text_type_digits-default`}>
            17,2
          </span>
        </li>
        <li className={`${styles.ingredientItem}`}>
          <span className={styles.textBlock}>Углеводы, г</span>
          <span className={`${styles.textBlock} mt-2 text_type_digits-default`}>
            10,2
          </span>
        </li>
      </ul>
    </div>
  </Modal>
);

export default IngredientDetails;
