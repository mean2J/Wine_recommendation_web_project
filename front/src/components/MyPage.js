import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../api";
import { UserStateContext } from "../App";

import styled from "styled-components";
import { Card, Tabs } from "antd";

import MyInfoEditForm from "./myInfo/MyInfoEditForm";
import MyInfo from "./myInfo/MyInfo";
import BookmarkList from "./bookmark/BookmarkList";
import ReviewList from "./review/ReviewList";
const { TabPane } = Tabs;

const MyPageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  background-color: #f8f9fa;
`;

const MyPageSection = styled(Card)`
  margin-top: 100px;
  margin-left: 360px;
  margin-right: 360px;

  background-color: #ffffff;
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
  const params = useParams();

  const [mypageOwner, setMypageOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const userState = useContext(UserStateContext);

  // const fetchMypageOwner = async (ownerId) => {
  //   // "/users/:유저id"로 사용자 정보 불러오기
  //   const res = await Api.get("users", ownerId);
  //   const ownerData = res.data;
  //   setMypageOwner(ownerData);
  //   setIsFetchCompleted(true); // 사용자 정보 불러오기 완료
  // };

  // useEffect(() => {
  //   if (!userState.user) {
  //     navigate("/", { replace: true });
  //     return;
  //   }
  //   if (params.userId) {
  //     const ownerId = params.userId;
  //     fetchMypageOwner(ownerId);
  //   } else {
  //     const ownerId = userState.user.id;
  //     fetchMypageOwner(ownerId);
  //   }
  // }, [params, userState, navigate]);

  // if (!isFetchCompleted) {
  //   return "loading...";
  // }

  // 임시 더미 데이터
  const [user, setUser] = useState({
    email: "qufgml0216@naver.com",
    name: "김별희",
    password: "1234",
    description: "안녕하세요. 저는 김별희입니다.",
  });

  return (
    <>
      <MyPageContainer>
        <MyPageSection>
          <TitleWrapper>
            <TitleText>마이 페이지</TitleText>
          </TitleWrapper>
          <InfoWrapper>
            <Tabs defaultActiveKey="1">
              <TabPane tab="내 정보" key="1" forceRender="true">
                {isEditing ? (
                  <MyInfoEditForm user={user} setIsEditing={setIsEditing} />
                ) : (
                  <MyInfo user={user} setIsEditing={setIsEditing} />
                )}
              </TabPane>
              <TabPane tab="북마크" key="2">
                <BookmarkList />
              </TabPane>
              <TabPane tab="나의 리뷰" key="3">
                <ReviewList />
              </TabPane>
            </Tabs>
          </InfoWrapper>
        </MyPageSection>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
