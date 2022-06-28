import { Card, Image, Rate, Button, Tag } from "antd";
import { useState, useEffect, useCallback } from "react";
import { StarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import * as Api from "../../../api";

import DeleteModal from "./DeleteModal";
import MyReviewEditForm from "./MyReviewEditForm";

const Container = styled.div`
  &:first-child {
    margin-top: 60px;
  }
`;

const StyledCard = styled(Card)`
  width: 700px;
  height: auto;
  box-shadow: 0 0 0 1px rgb(87 87 87 / 10%), 0 8px 8px 0 rgb(234 224 218 / 30%);
  border-radius: 20px;
  border: 0;
  z-index: 0;
  .ant-card-body {
    padding: 16px;
  }
  margin-bottom: 20px;
  margin-left: 80px;

  @media screen and (max-width: 1024px) {
    width: 300px;
  }
  @media screen and (max-width: 768px) {
    width: 200px;
    margin-left: 15px;
  }
`;

const ContentWrapper = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

const ImgWrapper = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const WineImg = styled(Image)`
  border-radius: 5px;
  flex: 0 0 20%;
  margin-top: 30px;
`;

const InfoColumn = styled.div`
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
  height: 200px;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    margin-left: -10px;
  }
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

const WineName = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1e1e1e;
  text-align: left;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin-top: 14px;
  margin-bottom: 8px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ReviewTitle = styled.div`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #1e1e1e;
  text-align: left;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;

  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ReviewContent = styled.div`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #1e1e1e;
  text-align: left;
  font-size: 13px;
  line-height: 24px;
  font-weight: 400;
`;

const RatingWrapper = styled.div`
  flex: 0 0 25%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const RatingContent = styled.div`
  padding-bottom: 15px;
  margin-top: 50px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const StyledTag = styled(Tag)`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    width: 20%;
    margin-left: 170px;
    margin-top: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 25%;
    margin-left: 105px;
  }
`;

const Date = styled.div`
  font-size: 13px;
  margin-left: 70px;
  color: gray;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const MyReviewButton = styled(Button)`
  font-weight: 400;
  font-size: 12px;
  border-radius: 5px;
  margin-top: 70px;
  margin-right: 5px;

  padding-left: 8px;
  padding-right: 8px;
  padding-top: 1px;
  padding-bottom: 1px;
`;

function ReviewItem({
  reviewInfo,
  myReviewList,
  setMyReviewList,
  currentUserId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [wineName, setWineName] = useState("");
  const [wineImageURL, setWineImageURL] = useState("");

  const [Info, setInfo] = useState(reviewInfo);

  const getWineName = useCallback(async () => {
    const res = await Api.get(`wines/${reviewInfo.wine}`);
    setWineName(res.data.name);
    setWineImageURL(res.data.ImageURL);
  }, [reviewInfo.wine]);

  useEffect(() => {
    getWineName();
  }, [getWineName]);

  const showModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <Container>
        <StyledCard>
          <ContentWrapper>
            {isEditing ? (
              <MyReviewEditForm
                reviewId={reviewInfo.id}
                setIsEditing={setIsEditing}
                Info={Info}
                setInfo={setInfo}
                setMyReviewList={setMyReviewList}
                currentUserId={currentUserId}
              />
            ) : (
              <>
                <ImgWrapper>
                  <WineImg width={150} src={"https://" + wineImageURL} />
                </ImgWrapper>
                <InfoColumn>
                  <WineInfoVintage>
                    <WineName>{wineName}</WineName>
                    <StyledTag icon={<StarOutlined />} color="gold">
                      {reviewInfo.rating}
                    </StyledTag>
                    <ReviewTitle>{reviewInfo.title}</ReviewTitle>
                    <ReviewContent>{reviewInfo.content}</ReviewContent>
                  </WineInfoVintage>
                </InfoColumn>
                <RatingWrapper>
                  <RatingContent>
                    <Rate defaultValue={reviewInfo.rating} disabled={"true"} />
                  </RatingContent>
                  <Date>{reviewInfo.createdAt.slice(0, 10)}</Date>
                  <ButtonWrapper>
                    <MyReviewButton
                      style={{ color: "#c365fd" }}
                      onClick={() => setIsEditing(true)}
                    >
                      수정
                    </MyReviewButton>
                    <MyReviewButton
                      onClick={showModal}
                      style={{ color: "red" }}
                    >
                      삭제
                    </MyReviewButton>
                  </ButtonWrapper>
                  {isModal && (
                    <DeleteModal
                      isModal={isModal}
                      setIsModal={setIsModal}
                      reviewId={reviewInfo.id}
                      myReviewList={myReviewList}
                      setMyReviewList={setMyReviewList}
                    />
                  )}
                </RatingWrapper>
              </>
            )}
          </ContentWrapper>
        </StyledCard>
      </Container>
    </>
  );
}

export default ReviewItem;
