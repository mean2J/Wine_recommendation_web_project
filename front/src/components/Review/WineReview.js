import { Button, Tag, Input, Rate, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";

const desc = ["1점", "2점", "3점", "4점", "5점"];

const FormWrapper = styled.div`
  width: 100%;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
`;

const StyledInp = styled(Input)`
  border-radius: 15px;
  margin: 10px 0 10px 0;
`;
const StyledArea = styled(TextArea)`
  border-radius: 15px;
`;

const StyledBtn = styled(Button)`
  font-weight: 400;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 15px;
  color: #c365fd;
  &:hover {
    color: #c365fd;
    border-color: #c365fd;
  }
`;

const StarLabel = styled.span`
  color: #ffd32a;
  margin-right: 10px;
  font-size: 16px;
`;

function WineReview({ wineId, setReview, setRatingVal, setRatingCnt }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [writing, setWriting] = useState(true);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating && !title && !content) {
      message.error("폼을 모두 작성해주세요.");
    } else if (!rating) {
      message.error("레이팅을 작성해주세요.");
    } else if (!title && !content) {
      message.error("제목을 작성해주세요.");
    } else if (!content) {
      message.error("내용을 작성해주세요.");
    } else {
      await Api.post(`reviews/${wineId}`, {
        title,
        content,
        rating,
      });
      const res = await Api.get(`reviews/wines/${wineId}`);
      const SearchRes = await Api.get(`reviews/rating/${wineId}`);
      if (!res && !SearchRes) {
        message.loading("등록 중...");
      } else {
        message.success("리뷰가 등록되었습니다.");
        setReview(res.data.reviews);
        setRatingVal(SearchRes.data.rating);
        setRatingCnt(SearchRes.data.ratingCnt);
      }

      setWriting(false);
      setTitle("");
      setContent("");
      setRating(0);
    }
  };
  const handleActive = () => {
    setWriting(true);
  };

  const handleChange = (value) => {
    setRating(value);
  };

  return (
    <>
      {writing ? (
        <FormWrapper>
          <span>
            <StarLabel>리뷰 남기기 </StarLabel>
            <Rate tooltips={desc} onChange={handleChange} value={rating} />
            {rating ? (
              <span className="ant-rate-text">{desc[rating - 1]}</span>
            ) : null}
          </span>
          <form onSubmit={handleReviewSubmit}>
            <StyledInp
              placeholder="제목을 입력해주세요."
              allowClear
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <StyledArea
              placeholder="내용을 입력해주세요."
              allowClear
              autoSize={{ minRows: 2, maxRows: 6 }}
              onChange={(e) => setContent(e.target.value)}
            />
            <StyledBtn htmlType="submit">제출</StyledBtn>
          </form>
        </FormWrapper>
      ) : (
        <StyledBtn onClick={handleActive}>리뷰 작성</StyledBtn>
      )}
    </>
  );
}

export default WineReview;
