import React, { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode[] | ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeModalHandler = () => {
    onClose();
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
    if (isOpen) {
      document.addEventListener("keydown", keyPressHandler);
      return () => {
        document.removeEventListener("keydown", keyPressHandler);
      };
    }
  }, [isOpen, keyPressHandler]);

  return (
    <>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <div ref={dialogRef} className={styles.modal}>
            <button onClick={closeModalHandler} className={styles.btnClose}>
              &times;
            </button>
            {children}
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
