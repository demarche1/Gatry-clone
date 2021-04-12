import * as Yup from "yup";

export default Yup.object().shape({
  title: Yup.string().required("Campo Obrigatório"),
  price: Yup.number().required("Campo Obrigatório"),
  imageUrl: Yup.string()
    .url("Você precisa informar uma URL válida")
    .required("Campo Obrigatório"),
  url: Yup.string()
    .url("Você precisa informar uma URL válida")
    .required("Campo Obrigatório"),
});
