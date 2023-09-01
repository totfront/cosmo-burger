import { FC, useEffect } from "react";
import styles from "./ingredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { useLocation, useNavigate } from "react-router-dom";
import { getIngredients } from "../../redux/actions/ingredients";

const IngredientDetails: FC = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedIngredient: {
      name,
      image,
      fat,
      proteins,
      carbohydrates,
      calories,
      _id,
    },
  } = useSelector((store: State) => store.ingredientModal);

  useEffect(() => {
    dispatch(getIngredients());
  }, [_id, navigate, dispatch, location.state]);

  return (
    <div className={styles.inner}>
      {_id ? (
        <>
          <img className={styles.image} src={image} alt="ingredient" />
          <h3 className={`${styles.heading} mt-4 text text_type_main-medium`}>
            {name}
          </h3>
          <ul
            className={`${styles.ingredientsList} text text_type_main-default text_color_inactive mb-5 mt-8 `}
          >
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Калории, ккал</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {calories}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Белки, г</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {proteins}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Жиры, г</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {fat}
              </span>
            </li>
            <li className={`${styles.ingredientItem}`}>
              <span className={styles.textBlock}>Углеводы, г</span>
              <span
                className={`${styles.textBlock} mt-2 text_type_digits-default`}
              >
                {carbohydrates}
              </span>
            </li>
          </ul>
        </>
      ) : (
        "wait 🫠"
      )}
    </div>
  );
};

export default IngredientDetails;
