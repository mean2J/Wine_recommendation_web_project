import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ZoomInOutlined } from "@ant-design/icons";

const SearchBtn = styled(ZoomInOutlined)`
  color: gray;
  font-size: 18px;
`;

function BookmarkInfoBtn({ wineName }) {
  const link = `/search/wines?text=${wineName}&page=1&perPage=10`;
  return (
    <div>
      <Link to={link}>
        <SearchBtn />
      </Link>
    </div>
  );
}

export default BookmarkInfoBtn;
