import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./orderDetails.module.css";
import { FC, useEffect } from "react";
import {
  categorizeIds,
  getAllIngredients,
  getLastUrlPart,
  getTimeStamp,
  getTotalPrice,
} from "../../services/helpers";
import { Ingredient } from "../../shared/types/Ingredient";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../shared/hooks";
import { getOrder } from "../../services/apis/orderApi";

type Props = {
  isModal?: boolean;
};

export const OrderDetails: FC<Props> = ({ isModal }) => {
  const { ingredients: sortedIngredients } = useSelector(
    (state) => state.ingredients
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { ingredients, status, name, number, updatedAt, isPending } =
    useSelector((state) => state.orderDetailsModal);

  useEffect(() => {
    const orderNumber = getLastUrlPart(pathname);
    dispatch(getOrder(getLastUrlPart(orderNumber)));
  }, [dispatch, pathname]);

  const time = getTimeStamp(updatedAt);
  const allIngredients = getAllIngredients(sortedIngredients);
  const orderPrice = getTotalPrice(allIngredients, ingredients);
  const categorizedIngredients = categorizeIds(ingredients);

  if (isPending) return <>Заказ не найден 🤷‍♀️</>;

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
        {status}
      </p>
      <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
      <ul className={`${styles.ingredients} mb-10 mr-6`}>
        {categorizedIngredients.uniqIds &&
          categorizedIngredients.uniqIds.map((id, i) => {
            const { image, name, price } = allIngredients.find(
              (i) => i._id === id
            ) as Ingredient;
            return (
              <li className={`${styles.ingredient}`} key={id + i}>
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
          categorizedIngredients.repeatedIds.map(({ id, count }, index) => {
            const { image, name, price } = allIngredients.find(
              (i) => i._id === id
            ) as Ingredient;
            return (
              <li className={`${styles.ingredient}`} key={id + index}>
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
        <span className={styles.priceWrapper}>
          <span className={`text text_type_digits-default mr-2`}>
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </span>
      </p>
    </section>
  );
};
