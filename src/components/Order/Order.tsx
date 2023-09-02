import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { Order as OrderResponse } from "../../redux/types/dataModels";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  categorizeIds,
  getAllIngredients,
  getTimeStamp,
  getTotalPrice,
} from "../../services/helpers";
import { State } from "../../shared/types/State";
import { SET_ORDER_DETAILS_MODAL } from "../../redux/actions/orderDetailsModal";

interface Props extends OrderResponse {
  withStatus?: boolean;
}

export const Order: FC<Props> = (props) => {
  const { number, name, status, ingredients, updatedAt, _id, withStatus } =
    props;
  const location = useLocation();
  const { ingredients: sortedIngredients } = useSelector(
    (state: State) => state.ingredients
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
          <span className={`text text_type_main-small`}>{status}</span>
        )}
        <div className={`${styles.footer}  mt-6`}>
          <ul className={styles.ingredientsImages}>
            {uniqIds?.map((id) => {
              const imgUrl = allIngredients.find((i) => i._id === id)?.image;
              return (
                <li className={`${styles.ingredient}`} key={uuid()}>
                  <img
                    className={styles.ingredientImage}
                    src={imgUrl}
                    alt="test"
                  />
                </li>
              );
            })}
            {repeatedIds?.map((item) => {
              const imgUrl = allIngredients.find(
                (i) => i._id === item.id
              )?.image;
              return (
                <li className={`${styles.ingredient}`} key={uuid()}>
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
