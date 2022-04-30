import { useState } from "react";
import styled from "styled-components";
import { Card, Rate } from "antd";

import BookmarkButton from "./BookmarkButton";

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

/*
 * 커스텀 색상 시도 중
 */
// const CustomIcon1 = () => {
//   return <span style={{ color: "#f1c0ce" }}>●</span>;
// };
// const CustomIcon2 = () => {
//   return <span style={{ color: "#e999b0" }}>●</span>;
// };
// const CustomIcon3 = () => {
//   return <span style={{ color: "#e07392" }}>●</span>;
// };
// const CustomIcon4 = () => {
//   return <span style={{ color: "#d5406b" }}>●</span>;
// };
// const CustomIcon5 = () => {
//   return <span style={{ color: "#c70039" }}>●</span>;
// };

// const customIcons = {
//   1: <CustomIcon1 />,
//   2: <CustomIcon2 />,
//   3: <CustomIcon3 />,
//   4: <CustomIcon4 />,
//   5: <CustomIcon5 />,
// };

const customIcons = {
  1: <span>●</span>,
  2: <span>●</span>,
  3: <span>●</span>,
  4: <span>●</span>,
  5: <span>●</span>,
};

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
      <span>당도 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.sweet}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>산도 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.acidity}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>바디 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.body}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>탄닌 </span>
      <Rate
        style={{ color: "#e07392" }}
        defaultValue={wineInfo.tannin}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
    </BookmarkContainer>
  );
}

export default BookmarkItem;
