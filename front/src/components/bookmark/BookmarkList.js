import { useState, useEffect } from "react";
import BookmarkItem from "./BookmarkItem";
import styled from "styled-components";
import * as Api from "../../api";
import { Row, Card } from "antd";

const BookmarkListContainer = styled(Row)`
  background-color: #f8f9fa;
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;

  border-radius: 6px;
`;

const DefaultMessage = styled(Card)`
  margin-top: 40px;
  margin-left: 370px;
  margin-bottom: 40px;

  justify-content: center;
  text-align: center;
  font-size: 20px;

  border: None;
  border-radius: 6px;
`;

function BookmarkList() {
  const [bookmarkList, setBookmarkList] = useState([]); // 북마크 리스트 데이터

  const getList = async () => {
    await Api.get("bookmarklist").then((res) => {
      setBookmarkList(res.data.bookmark);
    });
  };
  useEffect(() => {
    getList();
  }, [bookmarkList]);

  return (
    <BookmarkListContainer>
      {bookmarkList.length ? (
        bookmarkList.map((bookmark) => (
          <BookmarkItem key={bookmark.id} wineInfo={bookmark.wineInfo} />
        ))
      ) : (
        <DefaultMessage>
          <div>북마크 한 와인이 없습니다.</div>
          <div>관심있는 와인을 저장 해보세요🍷</div>
        </DefaultMessage>
      )}
      {/* {bookmarkList.map((bookmark) => (
        <BookmarkItem key={bookmark.id} wineInfo={bookmark.wineInfo} />
      ))} */}
    </BookmarkListContainer>
  );
}

export default BookmarkList;
