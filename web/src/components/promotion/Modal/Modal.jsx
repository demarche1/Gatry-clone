import UIModal from "components/UI/Modal/Modal";
import useApi from "components/utils/useApi";
import styles from "./Modal.module.css";
import PromotionModalCommentsTree from "components/promotion/Modal/CommentsTree";
import { useEffect, useState } from "react";
const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState("");

  const [load, loadInfo] = useApi({
    url: "/comments",
    method: "get",
    params: {
      promotionId,
      _expand: "user",
    },
  });
  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "post",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await sendComment({
      data: {
        userId: 2,
        promotionId,
        comment,
      },
    });
    load({
      debounced: false,
    });
    setComment("");
  };

  const sendAnswer = async (answerText, parentId) => {
    await sendComment({
      data: {
        userId: 1,
        promotionId,
        parentId,
        comment: answerText,
      },
    });
    load({
      debounced: false,
      quietly: true,
    });
  };

  useEffect(() => {
    load({
      debounced: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UIModal onClickClose={onClickClose}>
      <form className={styles.modalForm} onSubmit={onSubmit}>
        <textarea
          disabled={sendCommentInfo.loading}
          placeholder="Comentar..."
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
          required
        />
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <hr className={styles.hr} />
      <PromotionModalCommentsTree
        comments={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
        sendAnswer={sendAnswer}
      />
    </UIModal>
  );
};
export default PromotionModal;
