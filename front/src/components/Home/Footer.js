import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import { useNavigate } from "react-router-dom";

const FooterSection = styled.section`
  height: 70vh;
`;

const FooterWrapper = styled.div`
  padding: 120px 0 55px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FooterTitle = styled.h1`
  font-weight: 600;
  font-size: 54px;
  line-height: 67px;
  span {
    color: #fd6585;
  }
`;


const FooterDesc = styled.span`
  margin-top: 55px;
  font-weight: 300;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: black;
  span {
    color: #fd6585;
  }
`;

const FooterBtn = styled.div`
  margin-top: 55px;
  width: 160px;
  height: 60px;
  padding: 15px 19px;
  background: #fd6585;
  border-radius: 8px;
  border: none;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.6em;
  text-align: center;
  color: #ffffff;
  transition: background 0.2s ease, color 0.1s ease;
  cursor: pointer;
  &:hover {
    background-color: #e95c7a;
  }
`;

function Footer() {
  const navigate = useNavigate();

  const handleWine = () => {
    navigate("wine");
  }

  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0),
    2: useScrollFadeIn("up", 0.9, 0),
  };
  return (
    <>
      <FooterSection>
        <FooterWrapper >
          <FooterTitle{...animatedItem[0]}>지금 바로 사용해보세요!</FooterTitle>
          <FooterDesc {...animatedItem[1]}>
            사용자의 입맛에 맛는 <span>와인</span>을 추천하고, <br />
            <span>와인</span>을 즐기는데에 도움을 주고자 제안한 서비스 입니다.
          </FooterDesc>
          <FooterBtn {...animatedItem[2]} onClick={handleWine}>추천 받아보기</FooterBtn>
        </FooterWrapper>
      </FooterSection>
    </>
  );
}

export default Footer;
