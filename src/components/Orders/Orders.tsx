import { FeedItem } from "../FeedItem/FeedItem";
import styles from "./orders.module.css";

export const Orders = () => (
  <section className={`${styles.pageContainer}`}>
    <h1 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>
      Лента заказов
    </h1>
    <ul className={styles.feed}>
      <FeedItem />
      <FeedItem />
      <FeedItem />
      <FeedItem />
    </ul>
    <section className={styles.infoSection}>
      <article className={styles.statusListWrapper}>
        <h3 className={`text text_type_main-medium mb-4`}>Готовы:</h3>
        <ul className={styles.statusList}>
          <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
            034533
          </li>
          <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
            034533
          </li>
          <li className={`${styles.readyOrder} text_type_digits-default mt-2`}>
            034533
          </li>
        </ul>
      </article>
      <article className={styles.statusListWrapper}>
        <h2 className={`text text_type_main-medium mb-4`}>В работе:</h2>
        <ul className={styles.statusList}>
          <li className={`text text_type_digits-default mt-2`}>034533</li>
        </ul>
      </article>
      <article className={`${styles.totalWrapper} mt-15`}>
        <h2 className={`text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <span className={`${styles.textShadow} text text_type_digits-large`}>
          752 752
        </span>
      </article>
      <article className={`${styles.totalWrapper} mt-15`}>
        <h2 className={`text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <span className={`${styles.textShadow} text text_type_digits-large`}>
          123
        </span>
      </article>
    </section>
  </section>
);
