import styles from "./burgerIngredient.module.css";
import { FC, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";

interface Props {
  name: string;
  price: number;
  image: string;
}

const BurgerIngredient: FC<Props> = ({ image, price, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModalHandler} className={styles.ingredient}>
        <img className="mb-2" src={image} alt={name} />
        <div className={`${styles.price} mb-2`}>
          <span
            className={`${styles.priceNumber} mr-2 text text_type_digits-default`}
          >
            {price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={"text text_type_main-default"}>{name}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
        123
      </Modal>
    </>
  );
};

export default BurgerIngredient;
