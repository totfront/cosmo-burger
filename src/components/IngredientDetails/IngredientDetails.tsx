import { FC, useEffect } from "react";
import Modal from "../Modal/Modal";
import styles from "./ingredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import { useLocation, useNavigate } from "react-router-dom";
import { ingredientsPath } from "../../shared/paths";
import {
  HIDE_HOME_PAGE,
  SHOW_INGREDIENT_MODAL,
} from "../../services/actions/ingredientModal";

type Props = {
  onClose: () => void;
};

const IngredientDetails: FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
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
    const { from: pathname } = location.state || { from: { pathname: "" } };
    navigate(`${ingredientsPath}/${_id}`);
    if (!pathname) {
      dispatch({ type: HIDE_HOME_PAGE });
      dispatch({ type: SHOW_INGREDIENT_MODAL });
    }
  }, [_id, navigate, dispatch, location.state]);

  return (
    <Modal onClose={onClose} isIngredient>
      <div className={styles.inner}>
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
      </div>
    </Modal>
  );
};

export default IngredientDetails;
