import styles from "./orderMetrics.module.css";
import { State } from "../../shared/types/State";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

export const OrderMetrics = () => {
  const { orders, total, totalToday } = useSelector(
    (state: State) => state.feed
  );
  return (
    <section className={styles.infoSection}>
      <article>
        <h3 className={`text text_type_main-medium mb-4`}>Готовы:</h3>
        <ul className={styles.statusList}>
          {orders.map(
            (o, index) =>
              index < 30 &&
              o.status === "done" && (
                <li
                  key={uuid()}
                  className={`${styles.readyOrder} text_type_digits-default mt-2`}
                >
                  {o.number}
                </li>
              )
          )}
        </ul>
      </article>
      <article>
        <h2 className={`text text_type_main-medium mb-4`}>В работе:</h2>
        <ul className={styles.statusList}>
          {orders.map(
            (o, index) =>
              index < 50 &&
              o.status !== "done" && (
                <li
                  key={uuid()}
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
          {total}
        </span>
      </article>
      <article className={`${styles.totalWrapper} mt-15`}>
        <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <span className={`${styles.textShadow} text text_type_digits-large`}>
          {totalToday}
        </span>
      </article>
    </section>
  );
};
