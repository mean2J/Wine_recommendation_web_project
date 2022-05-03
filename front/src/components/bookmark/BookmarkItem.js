import React, { useState } from "react";
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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 50px;
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
  font-weight: 450;
`;

function BookmarkItem({ wineInfo, bookmarkList, setBookmarkList }) {
  const [isBookmarked, setIsBookmarked] = useState(true);
  return (
    <BookmarkContainer style={contentStyle}>
      <HeaderWrapper>
        <BookmarkInfoType type={wineInfo.type} />
        <BookmarkButton
          bookmarkList={bookmarkList}
          setBookmarkList={setBookmarkList}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          wineId={wineInfo.id}
        />
      </HeaderWrapper>
      <Name>{wineInfo.name}</Name>
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

export default React.memo(BookmarkItem);
