import PromotionCard from "components/promotion/Card/Card";
import PromotionModal from "components/promotion/Modal/Modal";
import { useState } from "react";
const PromotionList = ({ promotions, error, loading, load }) => {
  const [promotionId, setPromotionId] = useState(null);
  if (error) {
    return (
      <div>Ocorreu algum erro durante a pesquisa em nosso banco de dados</div>
    );
  }
  if (loading || promotions === null) {
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
        />
      ))}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => {
            setPromotionId(null);
            load({ debounced: null });
          }}
        />
      )}
    </div>
  );
};
export default PromotionList;
