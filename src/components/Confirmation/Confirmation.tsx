import { FC } from "react";
import styles from "./confirmation.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";

const Confirmation: FC = () => {
  const { id, name } = useSelector((store: State) => store.orderDetails);

  return (
    <div className={styles.inner}>
      <h2 className="text text_type_digits-large mt-20">{id}</h2>
      <h3 className={`${styles.heading} mt-8 text text_type_main-medium`}>
        {name}
      </h3>
      <img src={doneImage} className={"mt-15"} alt="Done" />
      <p className={`${styles.textBlock} mt-15 text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.textBlock} mt-4 text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default Confirmation;
