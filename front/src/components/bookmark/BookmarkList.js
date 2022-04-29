import { useState, useEffect } from "react";
import BookmarkItem from "./BookmarkItem";
import styled from "styled-components";
import * as Api from "../../api";
import { Row } from "antd";

function BookmarkList() {
  const [bookmarkList, setBookmarkList] = useState([]); // 북마크 리스트 데이터

  const getList = async () => {
    await Api.get("bookmarklist").then((res) => {
      setBookmarkList(res.data);
    });
  };
  useEffect(() => {
    getList();
  }, [bookmarkList]);

  return (
    <Row>
      {bookmarkList.map((bookmark) => (
        <BookmarkItem key={bookmark.id} wineInfo={bookmark.wineInfo} />
      ))}
    </Row>
  );
}

export default BookmarkList;
