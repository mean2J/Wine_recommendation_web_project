import { Card, Image, Rate } from "antd";

import styled from "styled-components";

const ReviewkItemContainer = styled(Card)`
  border: None;
  border-radius: 15px;
  background-color: #ffffff;

  padding-top: 15px;
  padding-bottom: 15px;

  display: flex;
`;

const ReviewImg = styled(Image)`
  border-radius: 5px;
`;

function ReviewItem() {
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
          <div className="review_title">
            Indomita Nostros Gran Reserva Cabernet Sauvignon
          </div>
          <Rate defaultValue={3} disabled={"true"} />
          <div className="diary_date">"2022-04-23"</div>
          <div className="review_content">"맛있어요"</div>
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
