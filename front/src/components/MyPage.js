import React, { useState, useEffect } from "react";

import "antd/dist/antd.css";
import styled from "styled-components";
import { Tabs } from "antd";
import MyInfoEditForm from "./user/MyInfoEditForm";
import MyInfo from "./user/MyInfo";
const { TabPane } = Tabs;

const MyPageContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

const MyPageSection = styled.section`
  height: 100vh;
  margin-top: 60px;
  margin-left: 360px;
  margin-right: 360px;
`;

const TitleWrapper = styled.div``;

const TitleText = styled.h2``;

const InfoWrapper = styled.div``;

function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  // 임시 더미 데이터
  const [user, setUser] = useState({
    email: "qufgml0216@naver.com",
    nickname: "StoneSeller",
    password: "1234",
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
                와인 북마크 내용
              </TabPane>
              <TabPane tab="내 리뷰" key="3">
                내가 작성한 리뷰가 보이는 곳
              </TabPane>
            </Tabs>
          </InfoWrapper>
        </MyPageSection>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
