import React, { FC } from "react";
import styles from "./modalOverlay.module.css";

type Props = {
  onClose: () => void;
};

const ModalOverlay: FC<Props> = ({ onClose }) => {
  const clickOverlayHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={clickOverlayHandler}></div>
  );
};

export default ModalOverlay;
