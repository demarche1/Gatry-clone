import { AiFillWarning } from "react-icons/ai";
import UIDeleteModal from "components/UI/DeleteModal/DeleteModal";
import styles from "./DeleteModal.module.css";
const PromotionDeleteModal = ({ onClickClose, onDelete }) => {
  return (
    <UIDeleteModal onClickClose={onClickClose}>
      <div className={styles.container}>
        <p className={styles.warningMessage}>
          <AiFillWarning className={styles.warningIcon} /> Tem certeza que
          deseja excluir essa promoção?
        </p>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={onClickClose}>
            Cancelar
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            Deletar
          </button>
        </div>
      </div>
    </UIDeleteModal>
  );
};
export default PromotionDeleteModal;
