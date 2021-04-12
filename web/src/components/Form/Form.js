import styles from "./Form.module.css";
import { useField } from "formik";
const Field = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.fieldLabel}>{label}</label>
      <input className={styles.fieldInput} {...field} {...props} />
      {meta.error && meta.touched && (
        <span className={styles.fieldError}>{meta.error}</span>
      )}
    </>
  );
};
export default Field;
