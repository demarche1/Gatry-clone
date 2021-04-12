import styles from "./Form.module.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Field from "components/Form/Form";
import { Formik, Form } from "formik";
import schema from "./schema";
import useApi from "components/utils/useApi";

const initialValues = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};
const PromotionForm = ({ id }) => {
  const history = useHistory();
  const [save, saveInfo] = useApi({
    method: id ? "put" : "post",
    url: id ? `/promotions/${id}` : "/promotions",
  });
  const [load, loadInfo] = useApi({
    method: "get",
    url: `/promotions/${id}`,
  });

  const onSave = async (formValues) => {
    await save({
      debounced: false,
      data: formValues,
    });
    if (!saveInfo.error) {
      history.push("/");
    }
  };

  useEffect(() => {
    if (id) {
      load({
        debounced: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const values = id ? loadInfo.data : initialValues;

  if (!values) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={values} onSubmit={onSave} validationSchema={schema}>
      <Form>
        <div>
          {id ? (
            <div className={styles.formTitle}>Editar promoção</div>
          ) : (
            <div className={styles.formTitle}>Cadastrar promoção</div>
          )}
        </div>
        <div className={styles.module}>
          <Field type="text" id="title" name="title" label="Título" />
        </div>
        <div className={styles.module}>
          <Field type="number" id="price" name="price" label="Preço" />
        </div>
        <div className={styles.module}>
          <Field
            type="text"
            id="imageUrl"
            name="imageUrl"
            label="Imagem(URL)"
          />
        </div>
        <div className={styles.module}>
          <Field type="text" id="url" name="url" label="Link para o site" />
        </div>
        <button className={styles.button} type="submit">
          Salvar
        </button>
      </Form>
    </Formik>
  );
};
export default PromotionForm;
