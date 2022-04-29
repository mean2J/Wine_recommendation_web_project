import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import Result from "./Result";
import { Pagination } from "antd";

function SearchWine() {
  const location = useLocation();
  const searchInp = new URLSearchParams(location.search).get("text");
  // const page = new URLSearchParams(location.search).get("page");
  // const perPage = new URLSearchParams(location.search).get("perPage");
  //임의값 지정
  const page = 1;
  const perPage = 10; 

  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSearch = useCallback(async () => {
    const res = await Api.get(
      `search/wines?text=${searchInp}&${page}&${perPage}`
    );
    setResult(res.data.wines);
  }, [page, perPage, searchInp]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div key={result.id} title={result.name}>
      {result.map((result) => (
        <Result key={result.id} title={result.name} type={result.type} />
      ))}
      <Pagination
        showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        defaultCurrent={page}
        total={perPage}
      />
    </div>
  );
}

export default SearchWine;
