import { useContext } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { message } from "antd";
import styled from "styled-components";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

const EmptyHeart = styled(HeartOutlined)`
  font-size: 30px;
  color: gray;
  transition: transform 0.3s ease;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

const Heart = styled(HeartFilled)`
  font-size: 30px;
  color: #fd6585;
  transition: transform 0.2s ease;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;

function BookmarkButton({
  isResultPage,
  isBookmarked,
  setIsBookmarked,
  wineId,
  bookmarkList,
  setBookmarkList,
}) {
  const userState = useContext(UserStateContext);

  // 선택된 북마크를 해제하고 delete 요청
  const uncheckButton = async () => {
    // 필터링 결과 페이지일 경우
    if (isResultPage) {
      setIsBookmarked(!isBookmarked);
    }

    // 북마크 삭제
    if (isBookmarked) {
      await Api.del(`bookmark/${wineId}`).then((res) => {
        const newState = bookmarkList.filter(
          (item) => item.wineInfo.id !== wineId
        );
        setBookmarkList(newState);
      });
    }
  };

  // 북마크 체크 할 경우 색상이 칠해지면서 post 요청
  const checkButton = async () => {
    // 로그인 하지 않을 경우 북마크 체크 불가
    if (userState.user !== null) {
      setIsBookmarked(!isBookmarked);

      // 북마크 추가
      if (!isBookmarked) {
        await Api.post("bookmark", { wineId }).then((res) => {
          console.log(res);
        });
      }
    } else {
      message.warning("회원가입 시 해당 와인을 북마크 할 수 있습니다.");
    }
  };

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
