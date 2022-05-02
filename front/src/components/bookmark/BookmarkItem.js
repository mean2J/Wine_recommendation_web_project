import { useState } from "react";
import styled from "styled-components";
import { Card } from "antd";

import BookmarkButton from "./BookmarkButton";
import BookmarkInfoRate from "./BookmarkInfoRate"; // 테스트 중

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

const Type = styled.div``;

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
      <Type>타입: {wineInfo.type} </Type>
      <br />
      <br />
      {/* <span>당도 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.sweet}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      /> */}
      <BookmarkInfoRate name={"당도"} value={wineInfo.sweet} />
      {/* 테스트 중 */}
      <br />
      {/* <span>산도 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.acidity}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      /> */}
      <BookmarkInfoRate name={"산도"} value={wineInfo.acidity} />
      <br />
      {/* <span>바디 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.body}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      /> */}
      <BookmarkInfoRate name={"바디"} value={wineInfo.body} />
      <br />
      {/* <span>탄닌 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.tannin}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      /> */}
      <BookmarkInfoRate name={"탄닌"} value={wineInfo.tannin} />
    </BookmarkContainer>
  );
}

export default BookmarkItem;
