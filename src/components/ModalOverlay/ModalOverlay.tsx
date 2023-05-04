import React, { FC, ReactNode } from "react";
import styles from "./modalOverlay.module.css";

type Props = {
  onClose: () => void;
  children?: ReactNode[] | ReactNode;
};

const ModalOverlay: FC<Props> = ({ onClose, children }) => {
  const clickOverlayHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={clickOverlayHandler}>
      {children}
    </div>
  );
};

export default ModalOverlay;
