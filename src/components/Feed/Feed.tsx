import { useEffect } from "react";
import { Order } from "../Order/Order";
import { OrderMetrics } from "../OrderMetrics/OrderMetrics";
import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FEED_WS_CONNECT } from "../../redux/actions/feed";
import { State } from "../../shared/types/State";
import { v4 as uuid } from "uuid";

export const Feed = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: State) => state.feed);

  useEffect(() => {
    dispatch({ type: FEED_WS_CONNECT });
  }, [dispatch]);
  return (
    <section className={`${styles.pageContainer}`}>
      <h1 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>
        Лента заказов
      </h1>
      <ul className={styles.orders}>
        {orders.map(({ ...order }) => {
          return <Order {...order} key={uuid()} />;
        })}
      </ul>
      <OrderMetrics />
    </section>
  );
};
