import styles from "./ordersMetrics.module.css";
import { State } from "../../shared/types/State";
import { useSelector } from "react-redux";

export const OrdersMetrics = () => {
  const { orders } = useSelector((state: State) => state.feed);
  return (
    <section className={styles.infoSection}>
      <article className={styles.statusListWrapper}>
        <h3 className={`text text_type_main-medium mb-4`}>Готовы:</h3>
        <ul className={styles.statusList}>
          {orders.map(
            (o, index) =>
              index < 30 &&
              o.status === "done" && (
                <li
                  className={`${styles.readyOrder} text_type_digits-default mt-2`}
                >
                  {o.number}
                </li>
              )
          )}
        </ul>
      </article>
      <article className={styles.statusListWrapper}>
        <h2 className={`text text_type_main-medium mb-4`}>В работе:</h2>
        <ul className={styles.statusList}>
          {orders.map(
            (o, index) =>
              index < 30 &&
              o.status !== "done" && (
                <li
                  className={`${styles.readyOrder} text_type_digits-default mt-2`}
                >
                  {o.number}
                </li>
              )
          )}
        </ul>
      </article>
      <article className={`${styles.totalWrapper} mt-15`}>
        <h2 className={`text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <span className={`${styles.textShadow} text text_type_digits-large`}>
          321
        </span>
      </article>
      <article className={`${styles.totalWrapper} mt-15`}>
        <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <span className={`${styles.textShadow} text text_type_digits-large`}>
          123
        </span>
      </article>
    </section>
  );
};
