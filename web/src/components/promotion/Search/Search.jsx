import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PromotionList from "components/promotion/List/List";
import UIInfiniteScroll from "components/UI/InfiniteScroll/InfiniteScroll";
import styles from "./Search.module.css";
import useApi from "components/utils/useApi";

const baseParams = {
  _embed: "comments",
  _sort: "id",
  _order: "desc",
  _limit: 5,
};

const PromotionSearch = () => {
  const [page, setPage] = useState(1);
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    debounceDelay: 1000,
    url: "/promotions",
    method: "get",
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      },
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchMore = () => {
    const newPage = page + 1;
    load({
      isFetchMore: true,
      debounced: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [...prevRequestInfo.data, ...newRequestInfo.data],
      }),
    });
    setPage(newPage);
  };

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
      />
      {loadInfo.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total && (
          <UIInfiniteScroll fetchMore={fetchMore} />
        )}
    </div>
  );
};
export default PromotionSearch;
