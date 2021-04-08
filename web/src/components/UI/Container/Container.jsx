import styles from "./Container.module.css";
const UIContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
export default UIContainer;
