import styles from "./PromotionCard.module.css";
import { Link } from "react-router-dom";
import UINumeral from "components/UI/Numeral/Numeral";

const PromotionCard = ({ promotion, onCommentsClick }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.img}
        src={promotion.imageUrl}
        alt={promotion.title}
      />
      <div className={styles.info}>
        <div className={styles.title}>{promotion.title}</div>
        <div className={styles.price}>
          <UINumeral format="$0,0.00">{promotion.price}</UINumeral>
        </div>
        <footer className={styles.footer}>
          {promotion.comments[0] && (
            <div className={styles.comment}>
              "{promotion.comments[0].comment}"
            </div>
          )}
          <button onClick={onCommentsClick} className={styles.comments}>
            {promotion.comments.length}{" "}
            {promotion.comments.length > 1 ? "Comentários" : "Comentário"}
          </button>
          <a
            className={styles.button}
            href={promotion.url}
            target="_blank"
            rel="noreferrer"
          >
            Ir para o Site
          </a>
          <Link className={styles.edit} to={`/edit/${promotion.id}`}>
            Editar
          </Link>
        </footer>
      </div>
    </div>
  );
};
export default PromotionCard;
