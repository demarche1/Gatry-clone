import styles from "./CommentsTree.module.css";
import { useMemo, useState } from "react";
const getTree = (list) => {
  if (!list) {
    return null;
  }
  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }
    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }
    childrenByParentId[item.parentId].push(item);
  });

  const buildNodes = (nodes) => {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  };
  return buildNodes(roots);
};
const PromotionModalCommentsTree = ({
  comments,
  loading,
  error,
  sendAnswer,
}) => {
  const tree = useMemo(() => getTree(comments), [comments]);

  const [comment, setComment] = useState("");
  const [activeAnswerBox, setActiveAnswerBox] = useState(null);

  if (loading || comments === null) {
    return <div className={styles.noLoadComments}>Loading...</div>;
  }
  if (error) {
    return (
      <div className={styles.noLoadComments}>
        Ocorreu algum erro durante nossa pesquisa em nosso banco de dados
        {console.log(error)}
      </div>
    );
  }
  if (comments.length === 0) {
    return (
      <div className={styles.noLoadComments}>Nenhum comentário encontrado.</div>
    );
  }

  const renderItem = (item) => {
    return (
      <li className={styles.item} key={item.id}>
        <img
          className={styles.avatar}
          src={item.user.avatarUrl}
          alt={`foto de ${item.user.name}`}
        />
        <div className={styles.ItemInfo}>
          <span className={styles.itemName}>{item.user.name}</span>
          <p>{item.comment}</p>
          <button
            type="button"
            className={styles.answerButton}
            onClick={() => {
              setActiveAnswerBox(activeAnswerBox === item.id ? null : item.id);
              setComment("");
            }}
          >
            Responder
          </button>
          {activeAnswerBox === item.id && (
            <div className={styles.answerBox}>
              <textarea
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              ></textarea>
              <button
                type="button"
                className={styles.sendAnswer}
                onClick={() => {
                  sendAnswer(comment, item.id);
                  setComment("");
                  setActiveAnswerBox(null);
                }}
              >
                Enviar
              </button>
            </div>
          )}
          <div>{item.children && renderTree(item.children)}</div>
        </div>
      </li>
    );
  };

  const renderTree = (list) => {
    return <ul className={styles.commentsTree}>{list.map(renderItem)}</ul>;
  };

  return renderTree(tree);
};
PromotionModalCommentsTree.defaultProps = {
  sendAnswer: () => {},
};
export default PromotionModalCommentsTree;
