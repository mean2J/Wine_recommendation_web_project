import { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";

import BookmarkButton from "./BookmarkButton";
import BookmarkInfoRate from "./BookmarkInfoRate"; // 테스트 중
import BookmarkInfoType from "./BookmarkInfoType";

const BookmarkContainer = styled(Card)`
  border: None;
  border-radius: 10px;
  margin-right: 20px;
  margin-left: 33px;
  margin-top: 30px;
  margin-bottom: 30px;

  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
`;

const contentStyle = {
  height: "400px",
  width: "300px",
  color: "black",
  textAlign: "center",
  background: "white",
};

const Name = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
`;

function BookmarkItem({ wineInfo }) {
  const [isBookmarked, setIsBookmarked] = useState(true);
  return (
    <BookmarkContainer style={contentStyle}>
      <BookmarkButton
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        wineId={wineInfo.id}
      />
      <Name>{wineInfo.name}</Name>
      <BookmarkInfoType type={wineInfo.type} />
      <br />
      <br />
      <BookmarkInfoRate name={"당도"} value={wineInfo.sweet} />
      <br />
      <BookmarkInfoRate name={"산도"} value={wineInfo.acidity} />
      <br />
      <BookmarkInfoRate name={"바디"} value={wineInfo.body} />
      <br />
      <BookmarkInfoRate name={"탄닌"} value={wineInfo.tannin} />
    </BookmarkContainer>
  );
}

export default BookmarkItem;
