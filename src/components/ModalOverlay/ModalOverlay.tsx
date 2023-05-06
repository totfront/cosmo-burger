import React, { FC } from "react";
import styles from "./modalOverlay.module.css";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
};

const modalRoot = document.getElementById("root") as HTMLElement;

const ModalOverlay: FC<Props> = ({ onClose }) => {
  const clickOverlayHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={clickOverlayHandler}></div>,
    modalRoot
  );
};

export default ModalOverlay;
