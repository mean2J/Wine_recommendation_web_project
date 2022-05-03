import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FirstSection from "./Home/FirstSection";
import Footer from "./Home/Footer";
import SecondSection from "./Home/SecondSection";
import { ThirdSection } from "./Home/ThirdSection";

const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
`;

function Main() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>메인 | 와인셀러</title>
        </Helmet>
      </HelmetProvider>

      <MainContainer>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <Footer />
      </MainContainer>
    </>
  );
}

export default Main;
