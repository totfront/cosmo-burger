import { FC } from "react";
import styles from "./ingredientDetails.module.css";
import { useSelector } from "../../shared/hooks";

const IngredientDetails: FC = () => {
  const {
    selectedIngredient: {
      name,
      image_large,
      fat,
      proteins,
      carbohydrates,
      calories,
      _id,
    },
  } = useSelector((store) => store.ingredientModal);

  return (
    <div className={styles.inner} data-testid="ingredient-details">
      {_id ? (
        <>
          <img
            className={styles.image}
            src={image_large}
            alt={name}
            loading="lazy"
          />
          <h3 className={`mt-4 text text_type_main-medium`}>{name}</h3>
          <ul
            className={`${styles.ingredientsList} text text_type_main-default text_color_inactive mb-5 mt-8 `}
          >
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Calories</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {calories}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Proteins</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {proteins}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Fats</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {fat}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Carbohydrates</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {carbohydrates}
              </span>
            </li>
          </ul>
        </>
      ) : (
        "Something went wrong 🫠"
      )}
    </div>
  );
};

export default IngredientDetails;
