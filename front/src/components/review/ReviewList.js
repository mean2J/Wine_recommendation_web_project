import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ReviewItem from "./ReviewItem";
import Loader from "./Loader";

const ReviewListContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

// 임시 더미데이터
const dummy = [
  {
    id: 1,
    name: "Baron du Val Red",
    score: 1,
    date: "2020-04-01",
    content: "첫번째 리뷰입니다. page1",
    page: 1,
  },
  {
    id: 2,
    name: "Baron du Val Blue",
    score: 1,
    date: "2020-04-02",
    content: "두번째 리뷰입니다. page1",
    page: 1,
  },
  {
    id: 3,
    name: "Baron du Val Black",
    score: 1,
    date: "2020-04-03",
    content: "세 번째 리뷰입니다. page1",
    page: 1,
  },
  {
    id: 4,
    name: "Baron du Val Green",
    score: 2,
    date: "2020-04-04",
    content: "네번째 리뷰입니다. page2",
    page: 2,
  },
  {
    id: 5,
    name: "Baron du Val Yellow",
    score: 2,
    date: "2020-04-05",
    content: "다섯번째 리뷰입니다. page2",
    page: 2,
  },
  {
    id: 6,
    name: "Baron du Val Yellow",
    score: 2,
    date: "2020-05-06",
    content: "여섯번째 리뷰입니다. page2",
    page: 2,
  },
  {
    id: 7,
    name: "Baron du Val Pink",
    score: 3,
    date: "2020-05-05",
    content: "일곱번째 리뷰입니다. page3",
    page: 3,
  },
  {
    id: 8,
    name: "Baron du Val Black",
    score: 3,
    date: "2020-05-05",
    content: "여덟번째 리뷰입니다. page3",
    page: 3,
  },
  {
    id: 9,
    name: "Baron du Val Red",
    score: 3,
    date: "2020-05-05",
    content: "아홉번째 리뷰입니다. page3",
    page: 3,
  },
  {
    id: 10,
    name: "Baron du Val Red",
    score: 4,
    date: "2020-05-05",
    content: "열번째 리뷰입니다. page4",
    page: 4,
  },
  {
    id: 11,
    name: "Baron du Val Red",
    score: 4,
    date: "2020-05-05",
    content: "열한번째 리뷰입니다. page4",
    page: 4,
  },
  {
    id: 12,
    name: "Baron du Val Red",
    score: 4,
    date: "2020-05-05",
    content: "열두번째 리뷰입니다. page4",
    page: 4,
  },
  {
    id: 13,
    name: "Baron du Val Red",
    score: 5,
    date: "2020-05-05",
    content: "열세번째 리뷰입니다. page5",
    page: 5,
  },
  {
    id: 14,
    name: "Baron du Val Red",
    score: 5,
    date: "2020-05-05",
    content: "열네번째 리뷰입니다. page5",
    page: 5,
  },
  {
    id: 15,
    name: "Baron du Val Red",
    score: 5,
    date: "2020-05-05",
    content: "열다섯번째 리뷰입니다. page5",
    page: 5,
  },
];

const filterReviewList = (page) => {
  return dummy.filter((review) => review.page === page);
};

function ReviewList() {
  const [page, setPage] = useState(1);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    console.log("현재 reviewList", reviewList);
    console.log("추가되는 list", filterReviewList(page));
  }, [page, reviewList]);

  const getMoreReview = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let Items = filterReviewList(page);
    setReviewList((reviewList) => [...reviewList, ...Items]);
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreReview();
      observer.observe(entry.target);
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    let observer; // intersection Observer을 담을 변수
    // target이 존재하는 경우에만 observer를 생성
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.7,
      });
      // observer가 관찰할 대상 지정
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, page]);

  return (
    <ReviewListContainer>
      {reviewList.map((review, idx) => {
        return <ReviewItem key={idx} currentReview={review} />;
      })}
      <div ref={setTarget}> {isLoaded && <Loader />}</div>
    </ReviewListContainer>
  );
}

export default ReviewList;
