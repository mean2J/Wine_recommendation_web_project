import styled from "styled-components";

import { Card, Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const BookmarkContainer = styled(Card)`
  border: None;
`;

const contentStyle = {
  height: "400px",
  color: "black",
  textAlign: "center",
  background: "#ececec",
};

const CustomIcon1 = () => {
  return <span style={{ color: "#f1c0ce" }}>●</span>;
};
const CustomIcon2 = () => {
  return <span style={{ color: "#e999b0" }}>●</span>;
};
const CustomIcon3 = () => {
  return <span style={{ color: "#e07392" }}>●</span>;
};
const CustomIcon4 = () => {
  return <span style={{ color: "#d5406b" }}>●</span>;
};
const CustomIcon5 = () => {
  return <span style={{ color: "#c70039" }}>●</span>;
};

const customIcons = {
  1: <CustomIcon1 />,
  2: <CustomIcon2 />,
  3: <CustomIcon3 />,
  4: <CustomIcon4 />,
  5: <CustomIcon5 />,
};

function BookmarkItem({ currentBookmark }) {
  console.log(currentBookmark);
  return (
    <div style={contentStyle}>
      <div>{currentBookmark.name}</div>
      <div>타입: {currentBookmark.type}</div>
      <br />
      <span>당도</span>
      <Rate
        defaultValue={currentBookmark.sweet}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>산도</span>
      <Rate
        defaultValue={currentBookmark.acidity}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>바디</span>
      <Rate
        style={{ color: "#f1c0ce" }}
        defaultValue={currentBookmark.body}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
      <br />
      <span>탄닌</span>
      <Rate
        defaultValue={currentBookmark.tannin}
        disabled={true}
        character={({ index }) => customIcons[index + 1]}
      />
    </div>
  );
}

export default BookmarkItem;
