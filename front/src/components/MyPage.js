import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../api";
import { UserStateContext } from "../App";
import { Helmet, HelmetProvider } from "react-helmet-async";

import styled from "styled-components";
import { Card, Tabs } from "antd";

import MyInfoEditForm from "./User/MyInfo/MyInfoEditForm";
import MyInfo from "./User/MyInfo/MyInfo";
import BookmarkList from "./bookmark/BookmarkList";
import MyReviewList from "./User/MyReview/MyReviewList";
import MyReviewEditForm from "./User/MyReview/MyReviewEditForm";

const { TabPane } = Tabs;

const MyPageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  background-color: #f8f9fa;
`;

const MyPageSection = styled(Card)`
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

function MyPage(props) {
  const navigate = useNavigate();

  const [mypageOwner, setMypageOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isMyInfoEditing, setIsMyInfoEditing] = useState(false);
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

  // 마이페이지 url
  const onTabClick = (id) => {
    localStorage.setItem("tabKey", id);
    navigate(`/myPage/${id}`);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>마이 페이지</title>
        </Helmet>
      </HelmetProvider>

      <MyPageContainer>
        <MyPageSection>
          <TitleWrapper>
            <TitleText>마이 페이지</TitleText>
          </TitleWrapper>
          <InfoWrapper>
            <Tabs
              defaultActiveKey={localStorage.getItem("tabKey")}
              onChange={onTabClick}
            >
              <TabPane
                tab={<span style={{ fontSize: 18 }}>내 정보</span>}
                key="1"
              >
                {isMyInfoEditing ? (
                  <MyInfoEditForm
                    user={mypageOwner}
                    setUser={setMypageOwner}
                    setIsEditing={setIsMyInfoEditing}
                  />
                ) : (
                  <MyInfo
                    user={mypageOwner}
                    setIsEditing={setIsMyInfoEditing}
                  />
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
                <MyReviewList />
              </TabPane>
            </Tabs>
          </InfoWrapper>
        </MyPageSection>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
