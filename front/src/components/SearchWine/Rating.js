import { Rate } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import * as Api from "../../api";
import { ratingAtom, ratingCntAtom } from "../../atoms";

const RatingContents = styled.div`
  padding-bottom: 15px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const RatingNum = styled.div`
  font-size: 40px;
  line-height: 48px;
  font-weight: 400;
  margin-right: 8px;
`;

const RatingDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding-right: 8px;
`;

const ReviewNum = styled.div`
  max-width: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

function Rating({ wineId, setRatingVal, setRatingCnt, rating, ratingCnt }) {
  // const [rating, setRating] = useState(0);
  // const [ratingCnt, setRatingCnt] = useState(0);

  const handleSearch = useCallback(async () => {
    const res = await Api.get(`reviews/rating/${wineId}`);
    setRatingVal(res.data.rating);
    setRatingCnt(res.data.ratingCnt);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <RatingContents>
      <RatingNum>{rating}</RatingNum>
      <RatingDetail>
        <Rate disabled value={rating} />
        <ReviewNum>{ratingCnt}개의 리뷰</ReviewNum>
      </RatingDetail>
    </RatingContents>
  );
}

export default Rating;
