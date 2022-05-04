import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import * as Api from "../../api";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 100px;
  background-color: #f8f9fa;
`;

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
    <>
      <HelmetProvider>
        <Helmet>
          <title>와인 검색 "{searchInp}"</title>
        </Helmet>
      </HelmetProvider>

      <div key={result.id} title={result.name}>
        {result.map((result) => (
          <SearchResult
            key={result.id}
            wineId={result.id}
            title={result.name}
            type={result.type}
            nation={result.nation}
            local={result.local}
            price={result.price}
            abv={result.abv}
            varieties={result.varieties}
            rating={result.rating}
            ratingCnt={result.ratingCnt}
          />
        ))}
        <StyledPagination
          simple
          current={currentPage}
          defaultCurrent={1}
          onChange={handlePageChange}
          total={totalPage}
        />
      </div>
    </>
  );
}

export default SearchWine;
