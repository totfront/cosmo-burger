import { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  title?: string;
  children?: ReactNode[] | ReactNode;
};

const modalRoot = document.getElementById("root") as HTMLElement;

const Modal: FC<Props> = ({ onClose, children, title }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  return createPortal(
    <>
      <dialog open ref={dialogRef} className={styles.modal}>
        {title && (
          <h3 className={`${styles.heading} text text_type_main-medium`}>
            {title}
          </h3>
        )}
        <button onClick={onClose} className={styles.btnClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </dialog>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
