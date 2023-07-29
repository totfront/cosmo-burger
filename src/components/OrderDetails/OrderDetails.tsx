import { FC } from "react";
import Modal from "../Modal/Modal";
import styles from "./orderDetails.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "react-redux";
import { State } from "../../shared/types/State";

type Props = {
  onClose: () => void;
};

const OrderDetails: FC<Props> = ({ onClose }) => {
  const { id, name } = useSelector((store: State) => store.orderDetails);

  return (
    <Modal onClose={onClose}>
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
    </Modal>
  );
};

export default OrderDetails;
