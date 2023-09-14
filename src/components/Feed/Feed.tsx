import { useEffect } from "react";
import { Order } from "../Order/Order";
import { OrderMetrics } from "../OrderMetrics/OrderMetrics";
import styles from "./feed.module.css";
import { FEED_WS_CLOSED, FEED_WS_INIT } from "../../redux/actions/feed";
import { wsNoMorePartiesOrdersUrl } from "../../shared/paths";
import { useDispatch, useSelector } from "../../shared/hooks";

export const Feed = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch({
      type: FEED_WS_INIT,
      payload: `${wsNoMorePartiesOrdersUrl}/all`,
    });
    return () => {
      dispatch({ type: FEED_WS_CLOSED, payload: undefined });
    };
  }, [dispatch]);

  return (
    <section className={`${styles.pageContainer}`}>
      <h1 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>
        Feed
      </h1>
      <ul className={styles.orders}>
        {orders.map(({ ...order }) => {
          return <Order {...order} key={order._id} />;
        })}
      </ul>
      <OrderMetrics />
    </section>
  );
};
