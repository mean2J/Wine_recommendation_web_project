import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import Result from "./Result";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function SearchWine() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchInp = new URLSearchParams(location.search).get("text");
  const page = new URLSearchParams(location.search).get("page");
  const perPage = new URLSearchParams(location.search).get("perPage");

  const [result, setResult] = useState([]);
  const currentPage = Number(page);
  const [totalPage, setTotalPage] = useState(0);

  const handleSearch = useCallback(async () => {
    const res = await Api.get(
      `search/wines?text=${searchInp}&page=${page}&perPage=${perPage}`
    );
    setResult(res.data.wines);
    setTotalPage(res.data.totalPage * 10);
  }, [page, perPage, searchInp]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handlePageChange = (value) => {
    navigate(
      `/search/wines?text=${searchInp}&page=${value}&perPage=${perPage}`
    );
  };

  return (
    <div key={result.id} title={result.name}>
      {result.map((result) => (
        <Result key={result.id} title={result.name} type={result.type} />
      ))}
      <Pagination
        simple
        current={currentPage}
        defaultCurrent={1}
        onChange={handlePageChange}
        total={totalPage}
      />
    </div>
  );
}

export default SearchWine;
