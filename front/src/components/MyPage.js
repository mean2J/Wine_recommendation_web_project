import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../api";
import { UserStateContext } from "../App";

import styled from "styled-components";
import { Card, Tabs } from "antd";

import MyInfoEditForm from "./User/MyInfo/MyInfoEditForm";
import MyInfo from "./User/MyInfo/MyInfo";
import BookmarkList from "./bookmark/BookmarkList";
// import ReviewList from "./review/ReviewList";
const { TabPane } = Tabs;

const MyPageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  background-color: #f8f9fa;
`;

const MyPageSection = styled(Card)`
  position: absolute;
  width: 1200px;
  left: 360px;
  top: 130px;

  background: #ffffff;
  border: 1px solid rgba(196, 196, 196, 0.5);
  box-sizing: border-box;
  border-radius: 20px;
`;

const TitleWrapper = styled.div``;

const TitleText = styled.h2`
  font-size: 30px;
  font-weight: 500;
`;

const InfoWrapper = styled.div``;

function MyPage() {
  const navigate = useNavigate();

  const [mypageOwner, setMypageOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchMypageOwner = async (ownerId) => {
    const res = await Api.get("users");
    const ownerData = res.data.user;

    setMypageOwner(ownerData);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/");
      return;
    }

    const ownerId = userState.user.id;

    fetchMypageOwner(ownerId);
    setIsFetchCompleted(true);
  }, [userState, navigate]);

  if (!isFetchCompleted) {
    return "로딩중입니다...";
  }

  return (
    <>
      <MyPageContainer>
        <MyPageSection>
          <TitleWrapper>
            <TitleText>마이 페이지</TitleText>
          </TitleWrapper>
          <InfoWrapper>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={<span style={{ fontSize: 18 }}>내 정보</span>}
                key="1"
                forceRender="true"
              >
                {isEditing ? (
                  <MyInfoEditForm
                    user={mypageOwner}
                    setUser={setMypageOwner}
                    setIsEditing={setIsEditing}
                  />
                ) : (
                  <MyInfo user={mypageOwner} setIsEditing={setIsEditing} />
                )}
              </TabPane>
              <TabPane
                tab={<span style={{ fontSize: 18 }}>북마크</span>}
                key="2"
              >
                <BookmarkList />
              </TabPane>
              <TabPane
                tab={<span style={{ fontSize: 18 }}>나의 리뷰</span>}
                key="3"
              >
                {/* <ReviewList /> */}
              </TabPane>
            </Tabs>
          </InfoWrapper>
        </MyPageSection>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
