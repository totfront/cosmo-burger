import { Order } from "../Order/Order";
import { OrdersMetrics } from "../OrdersMetrics/OrdersMetrics";
import styles from "./orders.module.css";

export const Orders = () => (
  <section className={`${styles.pageContainer}`}>
    <h1 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>
      Лента заказов
    </h1>
    <ul className={styles.orders}>
      <Order />
      <Order />
      <Order />
      <Order />
    </ul>
    <OrdersMetrics />
  </section>
);
