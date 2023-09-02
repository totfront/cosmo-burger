import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderDetails.module.css";
import { FC } from "react";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";
import {
  categorizeIds,
  getAllIngredients,
  getIdFromPath,
  getTimeStamp,
  getTotalPrice,
} from "../../services/helpers";
import { Ingredient } from "../../shared/types/Ingredient";
import { useLocation } from "react-router-dom";
import { Order } from "../../redux/types/dataModels";

type Props = {
  isModal?: boolean;
};

export const OrderDetails: FC<Props> = ({ isModal }) => {
  // const { ingredients, status, name, number, updatedAt } = useSelector(
  //   (state: State) => state.orderDetailsModal
  // );
  const { ingredients: sortedIngredients } = useSelector(
    (state: State) => state.ingredients
  );
  const {
    feed: { orders },
  } = useSelector((state: State) => state);
  const { pathname } = useLocation();
  const pathId = getIdFromPath(pathname);

  const order = orders.find((order) => order._id === pathId);

  if (order) {
    const { ingredients, status, name, number, updatedAt } = order;

    const time = getTimeStamp(updatedAt);
    const allIngredients = getAllIngredients(sortedIngredients);
    const orderPrice = getTotalPrice(allIngredients, ingredients);
    const categorizedIngredients = categorizeIds(ingredients);

    return (
      <section className={`${styles.wrapper}`}>
        <p
          className={`${styles.orderNumber} ${
            !isModal && styles.positionCenter
          } text text_type_digits-default mb-10`}
        >
          {`#${number}`}
        </p>
        <h3 className={`text text_type_main-medium mb-3`}>{name}</h3>
        <p className={`${styles.status} text text_type_main-default mb-15`}>
          {status === "done" ? "Выполнен" : "Готовится"}
        </p>
        <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
        <ul className={`${styles.ingredients} mb-10 mr-6`}>
          {categorizedIngredients.uniqIds &&
            categorizedIngredients.uniqIds.map((id) => {
              const { image, name, price } = allIngredients.find(
                (i) => i._id === id
              ) as Ingredient;
              return (
                <li className={`${styles.ingredient}`}>
                  <div className={`${styles.ingredientImageWrapper}`}>
                    <img
                      className={`${styles.ingredientImage}`}
                      src={image}
                      alt="ingredient"
                    />
                  </div>
                  <span
                    className={`${styles.ingredientName} text text_type_main-default`}
                  >
                    {name}
                  </span>
                  <div className={styles.priceWrapper}>
                    <span className={`text text_type_digits-default mr-2`}>
                      1 x {price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          {categorizedIngredients.repeatedIds &&
            categorizedIngredients.repeatedIds.map(({ id, count }) => {
              const { image, name, price } = allIngredients.find(
                (i) => i._id === id
              ) as Ingredient;
              return (
                <li className={`${styles.ingredient}`}>
                  <div className={`${styles.ingredientImageWrapper}`}>
                    <img
                      className={`${styles.ingredientImage}`}
                      src={image}
                      alt="ingredient"
                    />
                  </div>
                  <span
                    className={`${styles.ingredientName} text text_type_main-default`}
                  >
                    {name}
                  </span>
                  <div className={styles.priceWrapper}>
                    <span className={`text text_type_digits-default mr-2`}>
                      {count} x {price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
        </ul>
        <p className={styles.footer}>
          <span className={`text text_type_main-default text_color_inactive`}>
            {time}
          </span>
          <div className={styles.priceWrapper}>
            <span className={`text text_type_digits-default mr-2`}>
              {orderPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </p>
      </section>
    );
  }
  return null;
};
