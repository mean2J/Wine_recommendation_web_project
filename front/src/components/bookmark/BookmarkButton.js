import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import * as Api from "../../api";

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

function BookmarkButton({ isBookmarked, setIsBookmarked, wineId }) {
  const uncheckButton = async () => {
    // 선택된 북마크를 해제하고 delete 요청
    setIsBookmarked(!isBookmarked);
    console.log("북마크 삭제");
    // 북마크 삭제
    if (isBookmarked) {
      await Api.del(`bookmark/${wineId}`).then((res) => {
        console.log(res);
      });
    }
  };
  // 북마크 체크 할 경우 색상이 칠해지면서 post 요청
  const checkButton = async () => {
    setIsBookmarked(!isBookmarked);
    console.log("북마크 추가");
    // 북마크 추가
    if (!isBookmarked) {
      await Api.post("bookmark", { wineId }).then((res) => {
        console.log(res);
      });
    }
  };

  // 취소 할 때 function도 만들기 del

  return (
    <div>
      {isBookmarked ? (
        <Heart onClick={uncheckButton} />
      ) : (
        <EmptyHeart onClick={checkButton} />
      )}
    </div>
  );
}

export default BookmarkButton;
