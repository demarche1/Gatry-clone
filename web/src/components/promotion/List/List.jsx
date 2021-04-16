import { useState } from "react";
import PromotionCard from "components/promotion/Card/Card";
import PromotionModal from "components/promotion/Modal/Modal";
import PromotionDeleteModal from "components/promotion/DeleteModal/DeleteModal";
import useApi from "components/utils/useApi";
const PromotionList = ({ promotions, error, loading, reFetch }) => {
  const [promotionId, setPromotionId] = useState(null);
  const [deletePromotionId, setDeletePromotionId] = useState(null);

  const [deletePromotion] = useApi({
    method: "delete",
    onCompleted: () => {
      reFetch();
    },
  });

  if (error) {
    return (
      <div>Ocorreu algum erro durante a pesquisa em nosso banco de dados</div>
    );
  }
  if (promotions === null) {
    return <div>Loading...</div>;
  }

  if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }
  return (
    <div>
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onCommentsClick={() => {
            setPromotionId(promotion.id);
          }}
          onDeleteClick={() => {
            setDeletePromotionId(promotion.id);
          }}
        />
      ))}
      {loading && <div>Carregando novas promoções</div>}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => {
            setPromotionId(null);
          }}
        />
      )}
      {deletePromotionId && (
        <PromotionDeleteModal
          onClickClose={() => {
            setDeletePromotionId(null);
          }}
          onDelete={() => {
            deletePromotion({
              debounced: false,
              url: `/promotions/${deletePromotionId}`,
            });
            setDeletePromotionId(null);
          }}
        />
      )}
    </div>
  );
};
export default PromotionList;
