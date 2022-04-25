import { useEffect, useState } from "react";
import styled from "styled-components";

import ReviewItem from "./ReviewItem";
import InfiniteScroll from "./InfiniteScroll";

const ReviewListContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 15px;
`;

// 임시 더미데이터
const dummy = [
  {
    id: 1,
    name: "Baron du Val Red",
    score: 3,
    date: "2020-04-23",
    content: "맛있어요",
  },
  {
    id: 2,
    name: "Baron du Val Blue",
    score: 2,
    date: "2020-04-26",
    content: "별로에요",
  },
  {
    id: 3,
    name: "Baron du Val Black",
    score: 5,
    date: "2020-04-29",
    content: "향이 좋아요",
  },
  {
    id: 4,
    name: "Baron du Val Green",
    score: 4,
    date: "2020-05-02",
    content: "좋아요",
  },
  {
    id: 5,
    name: "Baron du Val Yellow",
    score: 1,
    date: "2020-05-05",
    content: "사지마세요",
  },
  {
    id: 5,
    name: "Baron du Val Yellow",
    score: 1,
    date: "2020-05-05",
    content: "사지마세요",
  },
];

function ReviewList() {
  const [datas, setDatas] = useState([]);
  const [scrollOptions, setScrollOptions] = useState({
    childLength: 5, // 첫 렌더 될 아이템 개수
    fullHeight: 0, // 총 스크롤 크기
  });
  const initialDatas = dummy;

  useEffect(() => {
    setDatas(initialDatas.slice(0, scrollOptions.childLength));
  }, [initialDatas, scrollOptions.childLength]);

  return (
    <ReviewListContainer>
      {/* {dummy.map((currentReview) => (
        <ReviewItem currentReview={currentReview} />
      ))} */}
      <InfiniteScroll
        datas={datas}
        setDatas={setDatas}
        scrollOptions={scrollOptions}
        setScrollOptions={setScrollOptions}
      />
    </ReviewListContainer>
  );
}

export default ReviewList;
