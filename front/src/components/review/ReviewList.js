import ReviewItem from "./ReviewItem";

import styled from "styled-components";

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
];

function ReviewList() {
  return (
    <ReviewListContainer>
      {dummy.map((currentReview) => (
        <ReviewItem currentReview={currentReview} />
      ))}
    </ReviewListContainer>
  );
}

export default ReviewList;
