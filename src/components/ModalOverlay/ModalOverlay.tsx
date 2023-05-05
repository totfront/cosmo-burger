import React, { FC, ReactNode } from "react";
import styles from "./modalOverlay.module.css";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  children?: ReactNode[] | ReactNode;
};

const modalRoot = document.getElementById("root") as HTMLElement;

const ModalOverlay: FC<Props> = ({ onClose, children }) => {
  const clickOverlayHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={clickOverlayHandler}>
      {children}
    </div>,
    modalRoot
  );
};

export default ModalOverlay;
