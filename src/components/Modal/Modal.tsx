import React, { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { HIDE_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";

type Props = {
  onClose: () => void;
  children?: ReactNode[] | ReactNode;
  isIngredient?: boolean;
};

const Modal: FC<Props> = ({ onClose, children, isIngredient }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModalHandler = () => {
    onClose();
    if (isIngredient) dispatch({ type: HIDE_INGREDIENT_MODAL });
    // todo handle onClose if not ingredient
  };

  const keyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  return (
    <>
      <dialog open ref={dialogRef} className={styles.modal}>
        <h3 className={`${styles.heading} text text_type_main-medium`}>
          {isIngredient && "Детали ингридиента"}
        </h3>
        <button onClick={closeModalHandler} className={styles.btnClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </dialog>
      <ModalOverlay onClose={onClose} />
    </>
  );
};

export default Modal;
