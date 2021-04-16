import React from "react";
import ReactDOM from "react-dom";
import styles from "./DeleteModal.module.css";
const UIDeleteModal = ({ children, onClickClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeModalButton}
          type="button"
          onClick={onClickClose}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default UIDeleteModal;
