import styles from "./Form.module.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import useApi from "components/utils/useApi";

const initialValues = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};
const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValues);
  const history = useHistory();
  const [save, saveInfo] = useApi({
    method: id ? "put" : "post",
    url: id ? `/promotions/${id}` : "/promotions",
    data: values,
  });
  const [load] = useApi({
    method: "get",
    url: `/promotions/${id}`,
    onCompleted: (response) => {
      setValues(response.data);
    },
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSave = async (event) => {
    event.preventDefault();
    save({
      debounced: false,
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

  if (!values) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={onSave}>
      <div>
        {id ? (
          <div className={styles.formTitle}>Editar promoção</div>
        ) : (
          <div className={styles.formTitle}>Cadastrar promoção</div>
        )}
      </div>
      <div className={styles.module}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.module}>
        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          name="price"
          value={values.price}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.module}>
        <label htmlFor="imageUrl">Imagem(URL)</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={values.imageUrl}
          onChange={onChange}
          required
        />
      </div>
      <div className={styles.module}>
        <label htmlFor="url">Link para o site</label>
        <input
          type="text"
          id="url"
          name="url"
          value={values.url}
          onChange={onChange}
          required
        />
      </div>
      <button className={styles.button} type="submit">
        Salvar
      </button>
    </form>
  );
};
export default PromotionForm;
