import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
const UIModal = ({ children, onClickClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.ovelay}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
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
export default UIModal;
