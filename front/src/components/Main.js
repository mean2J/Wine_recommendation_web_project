import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import FirstSection from "./Home/FirstSection";
import SecondSection from "./Home/SecondSection";
import { ThirdSection } from "./Home/ThirdSection";

const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 4000px;
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
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </MainContainer>
    </>
  );
}

export default Main;
