import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from "react-router-dom";
import styled from "styled-components";
import BackVideo from "../media/videoplayback.mp4";

const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 4000px;
`;

const FirstSection = styled.section`
  height: 100vh;
  &::before {
    background-color: #000;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const IntroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 22%;
  transform: translate(-50%, -50%);
`;

const IntroText = styled.h1`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 56px;
  line-height: 72px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const IntroDesc = styled.p`
  margin-bottom: 20px;
  font-weight: 200;
  font-size: 20px;
  line-height: 45px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

const IntroBtn = styled.div`
  width: 210px;
  height: 65px;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  background-image: linear-gradient(
    to right,
    #f6d365 0%,
    #fda085 51%,
    #f6d365 100%
  );
  cursor: pointer;
  &:hover {
    background-position: right center;
  }
`;

const IntroBtnText = styled.p`
  font-size: 17px;
  line-height: 45px;
  color: #ffffff;
  margin: 0;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
`;

const BgVideo = styled.video`
  height: 100%;
  object-fit: fill;
  width: 100%;
`;

const SecSection = styled.section`
  height: 100vh;
  background-color: green;
`;

function Main() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>메인 | 서비스이름</title>
        </Helmet>
      </HelmetProvider>

      <MainContainer>
        <FirstSection>
          <IntroTextWrapper>
            <IntroText>
              휴식이 필요한 <br />
              모든 순간, <br />
              (서비스이름)
            </IntroText>
            <IntroDesc>
              간편 로그인부터 추천서비스까지, <br />
              (서비스이름) 단 하나로 와인을 즐겨보세요.
            </IntroDesc>
            <IntroBtn>
              <IntroBtnText>
                <Link to={`/signUp`}>회원가입 하러가기 &rarr;</Link>
              </IntroBtnText>
            </IntroBtn>
          </IntroTextWrapper>
          <VideoWrapper>
            <BgVideo autoPlay={true} muted={true} loop={true}>
              <source src={BackVideo} type="video/mp4" />
            </BgVideo>
          </VideoWrapper>
        </FirstSection>
        {/* <SecSection /> */}
      </MainContainer>
    </>
  );
}

export default Main;
