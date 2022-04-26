import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function Loader() {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="red" />
    </LoaderWrap>
  );
}

export default memo(Loader);
