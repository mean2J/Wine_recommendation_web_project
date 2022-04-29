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

function BookmarkButton({ isBookmarked, setIsBookmarked }) {
  const ClickButton = () => {
    setIsBookmarked(!isBookmarked);
    // 버튼 클릭 시 북마크 추가
  };

  // 취소 할 때 function도 만들기 del

  return (
    <div>
      {isBookmarked ? (
        <Heart onClick={ClickButton} />
      ) : (
        <EmptyHeart onClick={ClickButton} />
      )}
    </div>
  );
}

export default BookmarkButton;
