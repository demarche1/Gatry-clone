import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PromotionList from "components/promotion/List/List";
import styles from "./Search.module.css";
import useApi from "components/utils/useApi";

const PromotionSearch = () => {
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    debounceDelay: 1000,
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _sort: "id",
      _order: "desc",
      title_like: search || undefined,
    },
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>PROMO SHOW</h1>
        <Link className={styles.link} to="/create">
          Nova Promoção
        </Link>
      </div>
      <input
        className={styles.input}
        value={search}
        type="search"
        placeholder="Buscar"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <PromotionList
        promotions={loadInfo.data}
        error={loadInfo.error}
        loading={loadInfo.loading}
        load={load}
      />
    </div>
  );
};
export default PromotionSearch;
