import ReviewItem from "./ReviewItem";

import styled from "styled-components";

const ReviewListContainer = styled.div`
  background-color: #f8f9fa;
`;

function ReviewList() {
  return (
    <ReviewListContainer>
      <ReviewItem />
      <ReviewItem />
    </ReviewListContainer>
  );
}

export default ReviewList;
