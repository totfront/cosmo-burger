import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { Order as OrderResponse } from "../../redux/types/dataModels";
import {
  categorizeIds,
  getAllIngredients,
  getTimeStamp,
  getTotalPrice,
} from "../../services/helpers";
import { SET_ORDER_DETAILS_MODAL } from "../../redux/actions/orderDetailsModal";
import { useDispatch, useSelector } from "../../shared/hooks";

interface Props extends OrderResponse {
  withStatus?: boolean;
}

export const Order: FC<Props> = (props) => {
  const { number, name, status, ingredients, updatedAt, _id, withStatus } =
    props;
  const location = useLocation();
  const { ingredients: sortedIngredients } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();
  const allIngredients = getAllIngredients(sortedIngredients);
  const orderPrice = getTotalPrice(allIngredients, ingredients);
  const categorizedIngredients = categorizeIds(ingredients);
  const time = getTimeStamp(updatedAt);
  const { repeatedIds, uniqIds } = categorizedIngredients;

  const onClick = () => {
    dispatch({ type: SET_ORDER_DETAILS_MODAL, payload: { ...props } });
  };

  const statusText =
    status === "done" ? ("Выполнен" ? "pending" : "Готовится") : "Отменен";

  return (
    <li className={styles.listItem}>
      <Link
        className={styles.link}
        to={_id}
        state={{ background: location }}
        onClick={onClick}
      >
        <div className={styles.header}>
          <span
            className={`${styles.orderNumber} text text_type_digits-default mr-4`}
          >
            {number}
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {time}
          </span>
        </div>
        <h3
          className={`${styles.heading} text text_type_main-medium mt-6 mb-2`}
        >
          {name}
        </h3>
        {withStatus && (
          <span className={`text text_type_main-small`}>{statusText}</span>
        )}
        <div className={`${styles.footer}  mt-6`}>
          <ul className={styles.ingredientsImages}>
            {uniqIds?.map((id, index) => {
              const imgUrl = allIngredients.find((i) => i._id === id)?.image;
              return (
                <li className={`${styles.ingredient}`} key={id}>
                  <img
                    className={styles.ingredientImage}
                    src={imgUrl}
                    alt="test"
                  />
                </li>
              );
            })}
            {repeatedIds?.map((item, index) => {
              const imgUrl = allIngredients.find(
                ({ _id }) => _id === item.id
              )?.image;
              return (
                <li className={`${styles.ingredient}`} key={_id + index}>
                  <img
                    className={`${styles.ingredientImage} ${styles.contrastDecrease}`}
                    src={imgUrl}
                    alt="test"
                  />
                  <span
                    className={`${styles.ingredientsCounter} text text_type_digits-default`}
                  >{`${item.count}`}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.price}>
            <span className={`text text_type_digits-default mr-2`}>
              {orderPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};
