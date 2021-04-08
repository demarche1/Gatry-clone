import { useParams } from "react-router-dom";
import UIContainer from "components/UI/Container/Container";
import PromotionForm from "components/promotion/Form/Form";
const PagesPromotionForm = () => {
  const { id } = useParams();
  return (
    <UIContainer>
      <PromotionForm id={id ? id : null} />
    </UIContainer>
  );
};
export default PagesPromotionForm;
