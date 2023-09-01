import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Link, useLocation } from "react-router-dom";
import { FC } from "react";
import { Order as OrderResponse } from "../../redux/types/dataModels";
import { useSelector } from "react-redux";
import {
  categorizeIds,
  getAllIngredients,
  getTotalPrice,
} from "../../services/helpers";
import { State } from "../../shared/types/State";

interface Props extends OrderResponse {
  withStatus?: boolean;
}

export const Order: FC<Props> = ({
  withStatus = false,
  number,
  name,
  status,
  ingredients,
}) => {
  const location = useLocation();
  const { ingredients: sortedIngredients } = useSelector(
    (state: State) => state.ingredients
  );
  const allIngredients = getAllIngredients(sortedIngredients);
  const orderPrice = getTotalPrice(allIngredients, ingredients);
  const categorizedIngredients = categorizeIds(ingredients);

  return (
    <li className={styles.listItem}>
      <Link
        className={styles.link}
        to={"ololo"}
        state={{ background: location }}
      >
        <div className={styles.header}>
          <span
            className={`${styles.orderNumber} text text_type_digits-default mr-4`}
          >
            {number}
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {/* todo: не забудь добавить dayjs */}
            Сегодня, 16:20
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
            {categorizedIngredients.uniqIds?.map((id, index) => {
              const imgUrl = allIngredients.find((i) => i._id === id)?.image;
              return (
                <li className={`${styles.ingredient}`} key={index}>
                  <img
                    className={styles.ingredientImage}
                    src={imgUrl}
                    alt="test"
                  />
                </li>
              );
            })}

            {categorizedIngredients.repeatedIds &&
              categorizedIngredients.repeatedIds?.length > 0 && (
                <li className={`${styles.ingredient}`}>
                  {categorizedIngredients.repeatedIds.map((item, index) => {
                    const imgUrl = allIngredients.find(
                      (i) => i._id === item.id
                    )?.image;
                    return (
                      <div key={index}>
                        <img
                          className={`${styles.ingredientImage} ${styles.contrastDecrease}`}
                          src={imgUrl}
                          alt="test"
                        />
                        <span
                          className={`${styles.ingredientsCounter} text text_type_digits-default`}
                        >{`x${item.count}`}</span>
                      </div>
                    );
                  })}
                </li>
              )}
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
