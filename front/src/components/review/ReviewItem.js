import { Card, Image, Rate } from "antd";

import styled from "styled-components";

const ReviewkItemContainer = styled(Card)`
  border: None;
  border-radius: 15px;
  background-color: #ffffff;

  width: 751px;
  height: auto;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const ReviewImg = styled(Image)`
  border-radius: 5px;
`;

const ReviewTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: #000000;
`;

function ReviewItem({ currentReview }) {
  return (
    <>
      <ReviewkItemContainer>
        <div>
          <ReviewImg
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="review_wrapper">
          <ReviewTitle>{currentReview.name}</ReviewTitle>
          <Rate defaultValue={currentReview.score} disabled={"true"} />
          <div className="diary_date">{currentReview.date}</div>
          <div className="review_content">{currentReview.content}</div>
        </div>
        <div className="btn_wrapper">
          <button className="btn_fix">수정</button>
          <button className="btn_delete">삭제</button>
        </div>
      </ReviewkItemContainer>
    </>
  );
}

export default ReviewItem;
