import { BackTop, Card, Rate } from "antd";
import BookmarkButton from "../bookmark/BookmarkButton";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ReviewForm from "../Review/ReviewForm";
import WineChart from "./WineChart";

const Container = styled.div`
  &:first-child {
    margin-top: 60px;
  }
`;

const StyledCard = styled(Card)`
  width: 64%;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px 20px 0 0;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

const BottleImg = styled.div`
  flex: 0 0 20%;
`;

const InfoColumn = styled.div`
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
  height: 200px;
`;

const RatingWrapper = styled.div`
  flex: 0 0 25%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

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

const RatingPrice = styled.div`
  color: #10ac84;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  display: block;
  text-align: center;
  padding: 8px 0 0;
`;

const WineInfo = styled.div`
  padding: 8px;
  box-sizing: inherit;
`;

const WineInfoVintage = styled.div`
  line-height: 28px;
  padding-bottom: 8px;
  display: block;
  color: #1e1e1e;
  background-color: transparent;
  text-align: left;
  line-height: 24px;
  font-weight: 400;
`;

const WineTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1e1e1e;
  text-align: left;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WineType = styled.div`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #1e1e1e;
  text-align: left;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

const WineNation = styled.div`
  text-align: left;
  font-size: 14px;
  color: grey;
  padding-bottom: 8px;
`;

const VarietyWrapper = styled.div`
  display: flex;
  margin: 0 0 0 -16px;
  padding: 16px 24px;
  border-radius: 16px;
  background-color: #fafafa;
`;

const VarietyInfo = styled.div`
  margin-left: 8px;
  color: #1e1e1e;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

function Result({
  wineId,
  nation,
  title,
  type,
  local,
  price,
  abv,
  varieties,
  bookmarked,
  sweet,
  acidity,
  body,
  tannin,
  bookmarkList,
  setBookmarkList,
}) {
  const isResultPage = true; // 북마크 분기점
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

  return (
    <>
      <Container>
        <WineChart
          sweet={sweet}
          acidity={acidity}
          body={body}
          tannin={tannin}
        />
        <StyledCard>
          <BookmarkButton
            isResultPage={isResultPage}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            wineId={wineId}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
          />
          <ContentWrapper>
            <BottleImg></BottleImg>
            <InfoColumn>
              <WineInfo>
                <WineInfoVintage>
                  <WineTitle>{title}</WineTitle>
                  <WineType>와인타입: {type}</WineType>
                </WineInfoVintage>
                <WineNation>
                  {nation}, {local}
                </WineNation>
              </WineInfo>
              <VarietyWrapper>
                <VarietyInfo>품종 : {varieties}</VarietyInfo>
              </VarietyWrapper>
            </InfoColumn>
            <RatingWrapper>
              <RatingContents>
                <RatingNum>4.5</RatingNum>
                <RatingDetail>
                  <Rate disabled defaultValue={4} />
                  <ReviewNum>1702개의 리뷰</ReviewNum>
                </RatingDetail>
              </RatingContents>
              <RatingPrice>가격: \{price}</RatingPrice>
            </RatingWrapper>
          </ContentWrapper>
        </StyledCard>
      </Container>
      <ReviewForm wineId={wineId}></ReviewForm>
      <BackTop />
    </>
  );
}

export default Result;
