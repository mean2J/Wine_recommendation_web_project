import React from "react";
import styled from "styled-components";
import SignUpForm from "./SignUpForm";

const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
`;

const RegisterSection = styled.section`
  display: flex;
  height: 70vh;
  &::before {
    background-color: #f8f9fa;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 75%;
  transform: translate(-50%, -50%);
  border: 1px solid lightblue;
  border-radius: 15px;
  align-items: center;
`;

const TitleText = styled.h1`
  margin-top: 45px;
  font-weight: 600;
  font-size: 38px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #c365fd;
`;

const TitleDesc = styled.p`
  margin-bottom: 20px;
  font-weight: 200;
  font-size: 18px;
  line-height: 45px;
  display: flex;
  align-items: center;
  color: #000000;
`;

function SignUp() {
  return (
    <>
      <MainContainer>
        <RegisterSection>
          <RegisterWrapper>
            <TitleText>와인셀러</TitleText>
            <TitleDesc>
              와인셀러는 세계 최고의 와인 추천 서비스입니다.
            </TitleDesc>
            <SignUpForm />
          </RegisterWrapper>
        </RegisterSection>
      </MainContainer>
    </>
  );
}
export default SignUp;
