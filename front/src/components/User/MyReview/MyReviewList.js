import React, { useState, useEffect, useCallback } from "react";
import MyReviewItem from "./MyReviewItem";
import styled from "styled-components";
import * as Api from "../../../api";
import { Row, Card } from "antd";

const MyReviewListContainer = styled(Row)`
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

function MyReviewList({ currentUserId }) {
  const [myReviewList, setMyReviewList] = useState([]);

  const getMyReviewList = useCallback(async () => {
    if (currentUserId) {
      let res = await Api.get(`reviews/authors/${currentUserId}`);
      const data = res.data.reviews;

      setMyReviewList(data);
    }
  }, [currentUserId]);

  useEffect(() => {
    getMyReviewList();
  }, [getMyReviewList]);

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
      {/* <div ref={setTarget}></div> */}
    </MyReviewListContainer>
  );
}

export default MyReviewList;
