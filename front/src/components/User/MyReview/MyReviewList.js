import React, { useState, useEffect, useCallback } from "react";
import MyReviewItem from "./MyReviewItem";
import styled from "styled-components";
import * as Api from "../../../api";
import { Row, Card, BackTop } from "antd";

const MyReviewListContainer = styled(Row)`
  background-color: #f8f9fa;
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;

  border-radius: 6px;

  @media screen and (max-width: 1024px) {
    display: relative;
    width: 100%;
    margin-left: 0px;
  }
  @media screen and (max-width: 768px) {
    display: relative;
    width: 80%;
  }
`;

const DefaultMessage = styled(Card)`
  margin-top: 40px;
  margin-left: 200px;
  margin-right: 200px;
  margin-bottom: 40px;

  padding: 50px 50px 50px 50px;

  justify-content: center;
  text-align: center;
  font-size: 20px;

  border: None;
  border-radius: 6px;
  background-color: #f8f9fa;

  @media screen and (max-width: 1024px) {
    display: relative;
    margin-left: 40px;
    margin-right: 0px;

    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
    margin-left: 0px;
  }
`;

function MyReviewList({ currentUserId }) {
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = React.useRef();
  const pageRef = React.useRef();
  const limit = 3;
  const [myReviewList, setMyReviewList] = useState([]);

  const getMyReviewList = useCallback(async () => {
    if (currentUserId) {
      setIsLoaded(true);
      isLoadedRef.current = true;

      let res = await Api.get(
        `reviews/authors/${currentUserId}?page=${pageRef.current}&limit=${limit}`
      );
      const data = res.data.reviews;

      if (data.length > 0) {
        setMyReviewList((prevState) => [...prevState, ...data]);
        setPage((page) => page + 1);
        pageRef.current = pageRef.current + 1;
        setIsLoaded(false);
        isLoadedRef.current = false;
      } else {
        setIsLoaded(false);
        isLoadedRef.current = false;
      }
    }
  }, [currentUserId]);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded && isLoadedRef.current === false) {
        observer.unobserve(entry.target);
        await getMyReviewList();
        observer.observe(entry.target);
      }
    },
    [isLoaded]
  );

  useEffect(() => {
    getMyReviewList();
  }, [getMyReviewList]);

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
  }, [myReviewList, setMyReviewList, target, isLoaded, onIntersect, page]);

  return (
    <MyReviewListContainer>
      {myReviewList.length ? (
        myReviewList.map((myReview) => (
          <MyReviewItem
            key={myReview.id}
            reviewInfo={myReview}
            myReviewList={myReviewList}
            setMyReviewList={setMyReviewList}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <DefaultMessage>
          <div>작성한 리뷰가 없습니다.</div>
          <div>와인에 대한 리뷰를 작성해보세요 💬</div>
        </DefaultMessage>
      )}
      <div ref={setTarget}></div>
      <BackTop />
    </MyReviewListContainer>
  );
}

export default MyReviewList;
