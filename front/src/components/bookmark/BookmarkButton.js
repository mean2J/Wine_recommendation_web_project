import { useState } from "react";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";

const EmptyHeart = styled(HeartOutlined)`
  font-size: 40px;
  color: gray;
  transition: transform 0.3s ease;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

const Heart = styled(HeartFilled)`
  font-size: 40px;
  color: red;
  transition: transform 0.2s ease;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

function BookmarkButton({ isLiked, setIsLiked }) {
  const ClickButton = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {isLiked ? (
        <Heart onClick={ClickButton} />
      ) : (
        <EmptyHeart onClick={ClickButton} />
      )}
    </div>
  );
}

export default BookmarkButton;
