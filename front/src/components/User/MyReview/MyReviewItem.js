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

function ReviewItem({ reviewInfo }) {
  return (
    <>
      <ReviewkItemContainer>
        <div>
          <div>
            <ReviewImg
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div>
            <div className="review_wrapper">
              <ReviewTitle>{reviewInfo.title}</ReviewTitle>
              <Rate defaultValue={reviewInfo.rating} disabled={"true"} />
              <div className="diary_date">{reviewInfo.createdAt}</div>
              <div className="review_content">{reviewInfo.content}</div>
            </div>
            <div className="btn_wrapper">
              <button className="btn_fix">수정</button>
              <button className="btn_delete">삭제</button>
            </div>
          </div>
        </div>
      </ReviewkItemContainer>
    </>
  );
}

export default ReviewItem;
