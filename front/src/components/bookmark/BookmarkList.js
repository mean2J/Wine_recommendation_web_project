import React, { useState, useEffect, useCallback } from "react";
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
  margin-left: 320px;
  margin-bottom: 40px;

  padding: 50px 50px 50px 50px;

  justify-content: center;
  text-align: center;
  font-size: 20px;

  border: None;
  border-radius: 6px;
  background-color: #f8f9fa;
`;

function BookmarkList() {
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = React.useRef();
  const pageRef = React.useRef();
  const [bookmarkList, setBookmarkList] = useState([]); // 북마크 리스트 데이터
  const maxCount = 3;

  const getList = async () => {
    setIsLoaded(true);
    isLoadedRef.current = true;

    let res = await Api.get(
      `bookmarklistpage?page=${pageRef.current}&maxBookmark=${maxCount}` // page 수정중
    );
    const data = res.data.bookmark;
    if (data.length > 0) {
      setBookmarkList((prevState) => [...prevState, ...data]);
      setPage((page) => page + 1);
      pageRef.current = pageRef.current + 1;
      setIsLoaded(false);
      isLoadedRef.current = false;
    } else {
      setIsLoaded(false);
      isLoadedRef.current = false;
    }
  };

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded && isLoadedRef.current === false) {
        observer.unobserve(entry.target);
        await getList();
        observer.observe(entry.target);
      }
    },
    [isLoaded]
  );

  useEffect(() => {
    let observer;

    if (target) {
      if (isLoadedRef.current === undefined) {
        isLoadedRef.current = isLoaded;
      }
      if (pageRef.current === undefined) {
        pageRef.current = page;
      }
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [bookmarkList, setBookmarkList, target, isLoaded, onIntersect, page]);

  return (
    <>
      <BookmarkListContainer>
        {bookmarkList.length ? (
          bookmarkList.map((bookmark, idx) => (
            <BookmarkItem
              key={idx}
              wineInfo={bookmark.wineInfo}
              bookmarkList={bookmarkList} // test
              setBookmarkList={setBookmarkList} // test
            />
          ))
        ) : (
          <DefaultMessage>
            <div>북마크 한 와인이 없습니다.</div>
            <div>관심있는 와인을 저장 해보세요 🍷</div>
          </DefaultMessage>
        )}
        <div ref={setTarget}></div>
      </BookmarkListContainer>
    </>
  );
}

export default BookmarkList;
